"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import EvaluationCard from "./evaluation-card.jsx"
import { evaluateTask, saveEvaluationLocally } from "./evaluate-utils.js"
import data from "./data-ielts.js"

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue)
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) setStoredValue(JSON.parse(item))
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
    }
  }, [key])
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }
  return [storedValue, setValue]
}

export default function SpeakingPage() {
  const topics = data.content.list
  const [query, setQuery] = useState("")
  const [selectedTopicId, setSelectedTopicId] = useState(topics[0]?.oralTopicId || null)
  const [favorites, setFavorites] = useLocalStorage("ielts:favs", {})
  const [learned, setLearned] = useLocalStorage("ielts:learned", {})
  const [filterPart, setFilterPart] = useState(null)

  const [showPartSelector, setShowPartSelector] = useState(false)

  const [practiceQueue, setPracticeQueue] = useState([])
  const [practiceIndex, setPracticeIndex] = useState(0)
  const [isPracticing, setIsPracticing] = useState(false)
  const [timer, setTimer] = useState(60)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerDuration, setTimerDuration] = useState(60)
  const timerRef = useRef(null)
  const [transcripts, setTranscripts] = useLocalStorage("ielts:transcripts", {})
  const [userData, setUserData] = useLocalStorage("ielts:userData", {
    practiceHistory: [],
    totalPracticeTime: 0,
    questionsAttempted: 0,
    lastPracticeDate: null,
  })

  const srRef = useRef(null)
  const [isRecording, setIsRecording] = useState(false)
  const [lastTranscript, setLastTranscript] = useState("")

  const [evaluation, setEvaluation] = useState(null)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const abortRef = useRef(null)

  useEffect(() => {
    if (!isPracticing || !isTimerRunning) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          setIsTimerRunning(false)
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPracticing, isTimerRunning])

  useEffect(() => {
    if (timer === 0 && isPracticing) {
      stopRecording()
    }
  }, [timer, isPracticing])

  function topicMatches(t, q) {
    const name = t.oralTopicName.toLowerCase()
    const qlower = q.toLowerCase()
    if (!q) return true
    if (name.includes(qlower)) return true
    return t.questionList.some((qq) => qq.oralQuestion.toLowerCase().includes(qlower))
  }

  const filteredTopics = useMemo(() => {
    return topics
      .filter((t) => topicMatches(t, query))
      .filter((t) => (filterPart == null ? true : t.questionList.some((q) => q.oralPart === filterPart)))
  }, [topics, query, filterPart])

  const selectedTopic = topics.find((t) => t.oralTopicId === selectedTopicId) || filteredTopics[0] || null

  function toggleFavorite(questionId) {
    setFavorites((prev) => ({ ...prev, [questionId]: !prev[questionId] }))
  }

  function toggleLearned(questionId) {
    setLearned((prev) => ({ ...prev, [questionId]: !prev[questionId] }))
  }

  function startPractice({ topicId = null, randomize = true, count = 5, part = null } = {}) {
    let source = topicId
      ? topics.find((t) => t.oralTopicId === topicId)?.questionList || []
      : topics.flatMap((t) => t.questionList)

    if (part) {
      source = source.filter((q) => q.oralPart === part)
    }

    let queue = [...source]
    if (randomize) queue = queue.sort(() => Math.random() - 0.5)
    queue = queue.slice(0, count)

    const duration = part === 1 ? 40 : part === 2 ? 120 : part === 3 ? 60 : 60

    setPracticeQueue(queue)
    setPracticeIndex(0)
    setIsPracticing(true)
    setIsTimerRunning(true)
    setTimer(duration)
    setTimerDuration(duration)
    setLastTranscript("")

    setUserData((prev) => ({
      ...prev,
      questionsAttempted: prev.questionsAttempted + 1,
      lastPracticeDate: new Date().toISOString(),
      practiceHistory: [
        ...prev.practiceHistory,
        {
          timestamp: new Date().toISOString(),
          topicId,
          part,
          questionCount: queue.length,
        },
      ],
    }))
  }

  function stopPractice() {
    setIsPracticing(false)
    setIsTimerRunning(false)
    setPracticeQueue([])
    setPracticeIndex(0)
    setTimer(60)
    setTimerDuration(60)
    stopRecording()
  }

  function pauseTimer() {
    setIsTimerRunning(false)
  }

  function continueTimer() {
    if (isPracticing && timer > 0) {
      setIsTimerRunning(true)
    }
  }

  function resetTimer() {
    setIsTimerRunning(false)
    setTimer(timerDuration)
  }

  function nextPractice() {
    if (practiceIndex < practiceQueue.length - 1) {
      setPracticeIndex(practiceIndex + 1)
      setTimer(timerDuration)
      setIsTimerRunning(true)
      setLastTranscript("")
    } else {
      setIsPracticing(false)
      setIsTimerRunning(false)
    }
  }

  function startRecording() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.")
      return
    }
    const sr = new SpeechRecognition()
    sr.lang = "en-US"
    sr.interimResults = true
    sr.continuous = true
    sr.onresult = (ev) => {
      const text = Array.from(ev.results)
        .map((r) => r[0].transcript)
        .join(" ")
      setLastTranscript(text)
    }
    sr.onerror = (e) => {
      console.error("SR error", e)
    }
    sr.onend = () => {
      setIsRecording(false)
    }
    sr.start()
    srRef.current = sr
    setIsRecording(true)
  }

  function stopRecording() {
    try {
      srRef.current?.stop()
    } catch (e) {}
    srRef.current = null
    setIsRecording(false)
    if (practiceQueue[practiceIndex]) {
      const qid = practiceQueue[practiceIndex].oralQuestionId
      setTranscripts((prev) => ({ ...prev, [qid]: prev[qid] ? [...prev[qid], lastTranscript] : [lastTranscript] }))
    }
  }

  async function onEvaluate() {
    if (!lastTranscript?.trim()) {
      alert("No transcript to evaluate. Please record or paste a transcript first.")
      return
    }

    const currentQuestion = practiceQueue[practiceIndex]
    if (!currentQuestion) return

    setIsEvaluating(true)
    abortRef.current = new AbortController()

    const payload = {
      taskId: currentQuestion.oralQuestionId,
      question: currentQuestion.oralQuestion,
      topic: selectedTopic?.oralTopicName || "Unknown",
      part: currentQuestion.oralPart,
      transcript: lastTranscript,
      duration_seconds: null,
      audio_quality: null,
      band_descriptor: null,
      context: {
        userId: null,
        sessionId: null,
      },
    }

    try {
      const result = await evaluateTask(payload, { signal: abortRef.current.signal })
      saveEvaluationLocally(currentQuestion.oralQuestionId, payload, result)
      setEvaluation({ payload, result })
    } catch (err) {
      console.error("Evaluation error:", err)
      if (err.message.includes("AbortError")) {
        alert("Evaluation cancelled.")
      } else if (err.message.includes("timed out") || err.message.includes("timeout")) {
        alert("Evaluation timed out. Please try again.")
      } else {
        alert(`Evaluation failed: ${err.message}`)
      }
    } finally {
      setIsEvaluating(false)
      abortRef.current = null
    }
  }

  function downloadSelected() {
    const payload = topics.flatMap((t) => t.questionList).filter((q) => favorites[q.oralQuestionId])
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "ielts-selected-questions.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  function exportUserData() {
    const exportData = {
      userData,
      favorites,
      learned,
      transcripts,
      exportDate: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ielts-user-data-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleRandomTen(selectedPart) {
    startPractice({ topicId: null, randomize: true, count: 10, part: selectedPart })
    setShowPartSelector(false)
  }

  return (
    <div className="ielts-container">
      {showPartSelector && (
        <div className="ielts-modal-overlay" onClick={() => setShowPartSelector(false)}>
          <div className="ielts-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="ielts-modal-title">Select Part for Random 10</h3>
            <div className="ielts-modal-buttons">
              <button onClick={() => handleRandomTen(1)} className="ielts-btn ielts-btn-primary">
                Part 1 (40s each)
              </button>
              <button onClick={() => handleRandomTen(2)} className="ielts-btn ielts-btn-primary">
                Part 2 (120s each)
              </button>
              <button onClick={() => handleRandomTen(3)} className="ielts-btn ielts-btn-primary">
                Part 3 (60s each)
              </button>
              <button onClick={() => setShowPartSelector(false)} className="ielts-btn ielts-btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="ielts-grid">
        {/* Sidebar */}
        <aside className="ielts-sidebar">
          <h2 className="ielts-sidebar-title">IELTS Speaking Topics</h2>

          <div className="ielts-sidebar-buttons">
            <button
              onClick={() => startPractice({ topicId: selectedTopicId, randomize: true, count: 5 })}
              className="ielts-btn ielts-btn-primary"
            >
              Practice 5 Questions
            </button>
            <button onClick={() => setShowPartSelector(true)} className="ielts-btn ielts-btn-secondary">
              Random 10
            </button>
            <button onClick={downloadSelected} className="ielts-btn ielts-btn-secondary">
              Export favorites
            </button>
            <button onClick={exportUserData} className="ielts-btn ielts-btn-secondary ielts-btn-last">
              Export all data
            </button>
          </div>

          <h2 className="ielts-sidebar-title">Search Topics</h2>
          <div className="ielts-search-box">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics or questions..."
              className="ielts-search-input"
            />
          </div>
          <div className="ielts-filter-buttons">
            <button
              className={`ielts-filter-btn ${filterPart == null ? "active" : ""}`}
              onClick={() => setFilterPart(null)}
            >
              All
            </button>
            <button className={`ielts-filter-btn ${filterPart === 2 ? "active" : ""}`} onClick={() => setFilterPart(2)}>
              Part 2
            </button>
            <button className={`ielts-filter-btn ${filterPart === 3 ? "active" : ""}`} onClick={() => setFilterPart(3)}>
              Part 3
            </button>
          </div>

          <div className="ielts-topics-list">
            {filteredTopics.map((t) => (
              <div
                key={t.oralTopicId}
                className={`ielts-topic-item ${t.oralTopicId === selectedTopicId ? "active" : ""}`}
                onClick={() => setSelectedTopicId(t.oralTopicId)}
              >
                <div>
                  <div className="ielts-topic-name">{t.oralTopicName}</div>
                  <div className="ielts-topic-count">{t.questionList.length} questions</div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="ielts-main">
          <div className="ielts-main-header">
            <div>
              <h1 className="ielts-main-title">{selectedTopic?.oralTopicName || "Pick a topic"}</h1>
              <p className="ielts-main-subtitle">{selectedTopic?.questionList.length || 0} questions in this topic</p>
            </div>
            <div className="ielts-total-pool">Total pool: {data.content.total}</div>
          </div>

          <div className="ielts-questions-list">
            {selectedTopic?.questionList.map((q) => (
              <div key={q.oralQuestionId} className="ielts-question-card">
                <div>
                  <div className="ielts-question-text">{q.oralQuestion}</div>
                  <div className="ielts-question-meta">
                    ID: {q.oralQuestionId} • Part {q.oralPart}
                  </div>
                </div>
                <div className="ielts-question-actions">
                  <div className="ielts-action-buttons">
                    <button
                      onClick={() => toggleFavorite(q.oralQuestionId)}
                      className={`ielts-btn-small ${favorites[q.oralQuestionId] ? "active" : ""}`}
                    >
                      {favorites[q.oralQuestionId] ? "★ Fav" : "☆ Fav"}
                    </button>
                    <button
                      onClick={() => toggleLearned(q.oralQuestionId)}
                      className={`ielts-btn-small ${learned[q.oralQuestionId] ? "active" : ""}`}
                    >
                      {learned[q.oralQuestionId] ? "✓ Learned" : "Mark"}
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      startPractice({ topicId: selectedTopic.oralTopicId, randomize: true, count: 1, part: q.oralPart })
                    }
                    className="ielts-btn-small"
                  >
                    Practice this
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Right panel: practice */}
        <aside className="ielts-practice-panel">
          <div className="ielts-panel-header">
            <h3 className="ielts-panel-title">Practice Panel</h3>
            <div className="ielts-panel-status">{isPracticing ? "In session" : "Idle"}</div>
          </div>

          <div className="ielts-panel-content">
            {isPracticing && practiceQueue[practiceIndex] ? (
              <div>
                <div className="ielts-practice-counter">
                  Question {practiceIndex + 1} / {practiceQueue.length}
                </div>
                <div className="ielts-practice-question">{practiceQueue[practiceIndex].oralQuestion}</div>

                <div className="ielts-practice-controls">
                  <div className="ielts-timer-section">
                    <div className="ielts-timer">{timer}s</div>
                    <div className="ielts-timer-controls">
                      <button onClick={pauseTimer} disabled={!isTimerRunning} className="ielts-btn-small">
                        Pause
                      </button>
                      <button
                        onClick={continueTimer}
                        disabled={isTimerRunning || timer === 0}
                        className="ielts-btn-small"
                      >
                        Continue
                      </button>
                      <button onClick={resetTimer} className="ielts-btn-small">
                        Reset
                      </button>
                    </div>
                  </div>

                  <div className="ielts-control-buttons">
                    {!isRecording ? (
                      <button onClick={startRecording} className="ielts-btn-small">
                        Start Rec
                      </button>
                    ) : (
                      <button onClick={stopRecording} className="ielts-btn-small ielts-btn-danger">
                        Stop
                      </button>
                    )}

                    <button onClick={nextPractice} className="ielts-btn-small">
                      Next
                    </button>
                    <button onClick={stopPractice} className="ielts-btn-small">
                      End
                    </button>
                  </div>
                </div>

                <div className="ielts-transcript-section">
                  <label className="ielts-transcript-label">Transcript</label>
                  <textarea
                    value={lastTranscript}
                    onChange={(e) => setLastTranscript(e.target.value)}
                    rows="4"
                    className="ielts-transcript-input"
                  />
                  <div className="ielts-transcript-buttons">
                    <button
                      onClick={() => {
                        const qid = practiceQueue[practiceIndex].oralQuestionId
                        setTranscripts((prev) => ({
                          ...prev,
                          [qid]: prev[qid] ? [...prev[qid], lastTranscript] : [lastTranscript],
                        }))
                        alert("Transcript saved locally!")
                      }}
                      className="ielts-btn-small"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        const qid = practiceQueue[practiceIndex].oralQuestionId
                        const items = transcripts[qid] || []
                        alert(items.join("\n---\n") || "No saved transcripts")
                      }}
                      className="ielts-btn-small"
                    >
                      View saved
                    </button>
                    <button
                      onClick={onEvaluate}
                      disabled={isEvaluating || !lastTranscript?.trim()}
                      className="ielts-btn-small"
                      title="Evaluate this response using AI examiner"
                    >
                      {isEvaluating ? "Evaluating..." : "Evaluate"}
                    </button>
                  </div>
                </div>

                {isEvaluating && (
                  <div className="ielts-evaluation-loading">
                    <div className="ielts-spinner"></div>
                    <p>Evaluating — this may take 5–15s</p>
                  </div>
                )}

                {evaluation && !isEvaluating && (
                  <EvaluationCard
                    evaluation={evaluation}
                    onClose={() => setEvaluation(null)}
                    onReEvaluate={onEvaluate}
                    isReEvaluating={isEvaluating}
                  />
                )}
              </div>
            ) : (
              <div className="ielts-panel-idle">Not practicing. Use the left panel to start a quick session.</div>
            )}
          </div>

          <div className="ielts-panel-section">
            <h4 className="ielts-section-title">Quick Controls</h4>
            <div className="ielts-section-buttons">
              <button
                onClick={() => {
                  setPracticeQueue([])
                  setIsPracticing(false)
                  setIsTimerRunning(false)
                  setTimer(60)
                  setTimerDuration(60)
                  setLastTranscript("")
                }}
                className="ielts-btn-small"
              >
                Reset session
              </button>
              <button
                onClick={() => {
                  selectedTopic?.questionList.forEach((q) =>
                    setLearned((prev) => ({ ...prev, [q.oralQuestionId]: true })),
                  )
                  alert("Marked topic learned locally")
                }}
                className="ielts-btn-small"
              >
                Mark topic learned
              </button>
            </div>
          </div>

          <div className="ielts-panel-section">
            <h4 className="ielts-section-title">Shortcuts</h4>
            <div className="ielts-shortcuts-hint">Keyboard shortcuts (browser focus required):</div>
            <ul className="ielts-shortcuts-list">
              <li>
                Press <kbd>P</kbd> to start a default practice (5 random)
              </li>
              <li>
                Press <kbd>N</kbd> for next during practice
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
