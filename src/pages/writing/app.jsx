"use client"

import { useState } from "react"

export default function WritingPage() {
  const [taskType, setTaskType] = useState("task1")
  const [essay, setEssay] = useState("")
  const [wordCount, setWordCount] = useState(0)

  const updateEssay = (text) => {
    setEssay(text)
    setWordCount(text.split(/\s+/).filter((w) => w.length > 0).length)
  }

  const tasks = {
    task1: {
      title: "Task 1: Academic",
      description: "You should spend about 20 minutes on this task.",
      prompt:
        "The chart below shows the average house prices in four countries between 1990 and 2002. Summarize the information by selecting and reporting the main features...",
      minWords: 150,
    },
    task2: {
      title: "Task 2: Essay",
      description: "You should spend about 40 minutes on this task.",
      prompt:
        "Some people think that the government should invest more money in public transportation. To what extent do you agree or disagree with this opinion?",
      minWords: 250,
    },
  }

  return (
    <div className="ielts-container">
      <div className="ielts-grid" style={{ gridTemplateColumns: "1fr 1.5fr 1fr" }}>
        {/* Task Selection */}
        <div className="ielts-sidebar">
          <h2 className="ielts-sidebar-title">Writing Tasks</h2>
          {Object.keys(tasks).map((key) => (
            <div
              key={key}
              className={`ielts-topic-item ${taskType === key ? "active" : ""}`}
              onClick={() => setTaskType(key)}
              style={{ cursor: "pointer", padding: "0.75rem" }}
            >
              <span className="ielts-topic-name">{tasks[key].title}</span>
            </div>
          ))}
        </div>

        {/* Task Prompt */}
        <div className="ielts-main">
          <h1 className="ielts-main-title">{tasks[taskType].title}</h1>
          <p className="ielts-main-subtitle">{tasks[taskType].description}</p>
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              backgroundColor: "#f5f5f5",
              borderRadius: "0.375rem",
              lineHeight: "1.6",
            }}
          >
            {tasks[taskType].prompt}
          </div>
        </div>

        {/* Writing Panel */}
        <div className="ielts-practice-panel">
          <div className="ielts-panel-header">
            <h3 className="ielts-panel-title">Your Essay</h3>
            <span style={{ fontSize: "0.75rem", color: "#666" }}>
              {wordCount} / {tasks[taskType].minWords} words
            </span>
          </div>
          <textarea
            value={essay}
            onChange={(e) => updateEssay(e.target.value)}
            placeholder="Start typing your essay here..."
            style={{
              width: "100%",
              height: "300px",
              marginTop: "0.75rem",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "0.375rem",
              fontFamily: "inherit",
              resize: "vertical",
              fontSize: "0.875rem",
            }}
          />
          <div style={{ marginTop: "0.75rem" }}>
            <button
              className="ielts-btn ielts-btn-primary"
              style={{ width: "100%" }}
              disabled={wordCount < tasks[taskType].minWords}
            >
              Submit Essay
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
