"use client"

import React from "react"

function EvaluationCard({ evaluation, onClose, onReEvaluate, isReEvaluating }) {
  const [expandedSections, setExpandedSections] = React.useState({
    justifications: true,
    strengths: true,
    weaknesses: true,
    modelAnswer: false,
  })

  if (!evaluation || !evaluation.result) return null

  const { result } = evaluation
  const { scores, justifications, strengths, weaknesses, modelAnswer, confidence, notes } = result
  const overallBand = scores.overallBand
  const confidencePercent = Math.round(confidence * 100)
  const isLowConfidence = confidence < 0.5

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const downloadEvaluation = () => {
    const dataStr = JSON.stringify(evaluation, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `evaluation-${evaluation.result.taskId}-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!")
    })
  }

  return (
    <div className="ielts-evaluation-card">
      <div className="ielts-evaluation-header">
        <h3 className="ielts-evaluation-title">Evaluation Results</h3>
        <button onClick={onClose} className="ielts-evaluation-close">
          ×
        </button>
      </div>

      {isLowConfidence && (
        <div className="ielts-evaluation-warning">
          <span className="ielts-warning-icon">⚠️</span>
          <span>Low confidence — audio was short or poor. Consider re-recording.</span>
        </div>
      )}

      <div className="ielts-evaluation-overall">
        <div className="ielts-overall-band">{overallBand}</div>
        <div className="ielts-overall-label">Overall Band</div>
      </div>

      <div className="ielts-evaluation-scores">
        <div className="ielts-score-bar">
          <div className="ielts-score-label">Fluency & Coherence</div>
          <div className="ielts-score-bar-container">
            <div className="ielts-score-bar-fill" style={{ width: `${(scores.fluencyCoherence / 9) * 100}%` }}></div>
            <span className="ielts-score-value">{scores.fluencyCoherence}</span>
          </div>
        </div>
        <div className="ielts-score-bar">
          <div className="ielts-score-label">Lexical Resource</div>
          <div className="ielts-score-bar-container">
            <div className="ielts-score-bar-fill" style={{ width: `${(scores.lexicalResource / 9) * 100}%` }}></div>
            <span className="ielts-score-value">{scores.lexicalResource}</span>
          </div>
        </div>
        <div className="ielts-score-bar">
          <div className="ielts-score-label">Grammatical Range</div>
          <div className="ielts-score-bar-container">
            <div className="ielts-score-bar-fill" style={{ width: `${(scores.grammaticalRange / 9) * 100}%` }}></div>
            <span className="ielts-score-value">{scores.grammaticalRange}</span>
          </div>
        </div>
        <div className="ielts-score-bar">
          <div className="ielts-score-label">Pronunciation</div>
          <div className="ielts-score-bar-container">
            <div className="ielts-score-bar-fill" style={{ width: `${(scores.pronunciation / 9) * 100}%` }}></div>
            <span className="ielts-score-value">{scores.pronunciation}</span>
          </div>
        </div>
      </div>

      <div className="ielts-evaluation-confidence">
        <span className="ielts-confidence-label">Confidence:</span>
        <span className="ielts-confidence-value">{confidencePercent}%</span>
      </div>

      {notes && (
        <div className="ielts-evaluation-notes">
          <strong>Notes:</strong> {notes}
        </div>
      )}

      <div className="ielts-evaluation-sections">
        <div className="ielts-collapsible-section">
          <button className="ielts-section-toggle" onClick={() => toggleSection("justifications")}>
            <span className="ielts-toggle-arrow">{expandedSections.justifications ? "▼" : "▶"}</span>
            Justifications
          </button>
          {expandedSections.justifications && (
            <div className="ielts-section-content">
              {justifications &&
                Object.entries(justifications).map(([key, value]) => (
                  <div key={key} className="ielts-justification-item">
                    <strong>{key.replace(/([A-Z])/g, " $1").trim()}:</strong> {value}
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="ielts-collapsible-section">
          <button className="ielts-section-toggle" onClick={() => toggleSection("strengths")}>
            <span className="ielts-toggle-arrow">{expandedSections.strengths ? "▼" : "▶"}</span>
            Strengths
          </button>
          {expandedSections.strengths && (
            <div className="ielts-section-content">
              {strengths && strengths.length > 0 ? (
                <ul className="ielts-strengths-list">
                  {strengths.map((strength, idx) => (
                    <li key={idx}>{strength}</li>
                  ))}
                </ul>
              ) : (
                <p className="ielts-no-content">No strengths identified.</p>
              )}
            </div>
          )}
        </div>

        <div className="ielts-collapsible-section">
          <button className="ielts-section-toggle" onClick={() => toggleSection("weaknesses")}>
            <span className="ielts-toggle-arrow">{expandedSections.weaknesses ? "▼" : "▶"}</span>
            Weaknesses & Suggestions
          </button>
          {expandedSections.weaknesses && (
            <div className="ielts-section-content">
              {weaknesses && weaknesses.length > 0 ? (
                <div className="ielts-weaknesses-list">
                  {weaknesses.map((weakness, idx) => (
                    <div key={idx} className="ielts-weakness-item">
                      <div className="ielts-weakness-issue">
                        <strong>Issue:</strong> {weakness.issue}
                      </div>
                      {weakness.example_from_transcript && (
                        <div className="ielts-weakness-example">
                          <strong>Example:</strong> <em>"{weakness.example_from_transcript}"</em>
                        </div>
                      )}
                      {weakness.suggestion && (
                        <div className="ielts-weakness-suggestion">
                          <strong>Suggestion:</strong> {weakness.suggestion}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="ielts-no-content">No weaknesses identified.</p>
              )}
            </div>
          )}
        </div>

        <div className="ielts-collapsible-section">
          <button className="ielts-section-toggle" onClick={() => toggleSection("modelAnswer")}>
            <span className="ielts-toggle-arrow">{expandedSections.modelAnswer ? "▼" : "▶"}</span>
            Model Answer
          </button>
          {expandedSections.modelAnswer && (
            <div className="ielts-section-content">
              {modelAnswer ? (
                <div className="ielts-model-answer">
                  <p>{modelAnswer}</p>
                  <button onClick={() => copyToClipboard(modelAnswer)} className="ielts-btn-small">
                    Copy
                  </button>
                </div>
              ) : (
                <p className="ielts-no-content">No model answer provided.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="ielts-evaluation-actions">
        <button onClick={onReEvaluate} disabled={isReEvaluating} className="ielts-btn-small">
          {isReEvaluating ? "Re-evaluating..." : "Re-evaluate"}
        </button>
        <button onClick={downloadEvaluation} className="ielts-btn-small">
          Export JSON
        </button>
        <button onClick={onClose} className="ielts-btn-small">
          Close
        </button>
      </div>
    </div>
  )
}

export { EvaluationCard }
export default EvaluationCard
