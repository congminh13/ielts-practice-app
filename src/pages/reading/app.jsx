"use client"

import { useState } from "react"

export default function ReadingPage() {
  const [selectedPassage, setSelectedPassage] = useState(0)

  const passages = [
    {
      id: 1,
      title: "The History of Coffee",
      text: "Coffee, one of the world's most popular beverages, has a rich history spanning centuries. The beverage we know today is the result of centuries of cultivation and trade...",
    },
    {
      id: 2,
      title: "Climate Change Effects",
      text: "Global climate change represents one of the most significant environmental challenges of our time. Rising temperatures, changing precipitation patterns, and increasing weather extremes...",
    },
  ]

  const questions = [
    { id: 1, text: "What is the main topic of the passage?", type: "multiple-choice" },
    { id: 2, text: "According to the passage, which statement is true?", type: "true-false" },
    { id: 3, text: "Fill in the blank: _____ is a major concern today.", type: "fill-blank" },
  ]

  return (
    <div className="ielts-container">
      <div className="ielts-grid" style={{ gridTemplateColumns: "1fr 1.5fr 1fr" }}>
        {/* Passage List */}
        <div className="ielts-sidebar">
          <h2 className="ielts-sidebar-title">Passages</h2>
          {passages.map((passage) => (
            <div
              key={passage.id}
              className={`ielts-topic-item ${selectedPassage === passage.id - 1 ? "active" : ""}`}
              onClick={() => setSelectedPassage(passage.id - 1)}
              style={{ cursor: "pointer", padding: "0.75rem" }}
            >
              <span className="ielts-topic-name">{passage.title}</span>
            </div>
          ))}
        </div>

        {/* Passage Text */}
        <div className="ielts-main">
          <div className="ielts-main-header">
            <div>
              <h1 className="ielts-main-title">Reading Passage {selectedPassage + 1}</h1>
              <p className="ielts-main-subtitle">{passages[selectedPassage].title}</p>
            </div>
          </div>
          <div style={{ marginTop: "1rem", lineHeight: "1.8", color: "#333" }}>
            <p>{passages[selectedPassage].text}</p>
          </div>
        </div>

        {/* Questions */}
        <div className="ielts-practice-panel">
          <div className="ielts-panel-header">
            <h3 className="ielts-panel-title">Questions</h3>
          </div>
          <div className="ielts-panel-content">
            {questions.map((q) => (
              <div key={q.id} className="ielts-question-card" style={{ marginBottom: "0.75rem" }}>
                <div>
                  <p className="ielts-question-text">
                    {q.id}. {q.text}
                  </p>
                  <input
                    type="text"
                    placeholder="Your answer"
                    style={{
                      width: "100%",
                      marginTop: "0.5rem",
                      padding: "0.5rem",
                      border: "1px solid #ddd",
                      borderRadius: "0.375rem",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
