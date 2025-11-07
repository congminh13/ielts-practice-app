"use client"

import { useState } from "react"

export default function ListeningPage() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const sections = [
    { id: 1, title: "Section 1: Conversation", duration: "3:45" },
    { id: 2, title: "Section 2: Monologue", duration: "3:15" },
    { id: 3, title: "Section 3: Discussion", duration: "4:20" },
    { id: 4, title: "Section 4: Lecture", duration: "3:50" },
  ]

  return (
    <div className="ielts-container">
      <div className="ielts-grid" style={{ gridTemplateColumns: "1fr 1.5fr 1fr" }}>
        {/* Sections List */}
        <div className="ielts-sidebar">
          <h2 className="ielts-sidebar-title">Sections</h2>
          {sections.map((section, idx) => (
            <div
              key={section.id}
              className={`ielts-topic-item ${currentSection === idx ? "active" : ""}`}
              onClick={() => setCurrentSection(idx)}
              style={{ cursor: "pointer", padding: "0.75rem" }}
            >
              <span className="ielts-topic-name">{section.title}</span>
              <span className="ielts-topic-count">{section.duration}</span>
            </div>
          ))}
        </div>

        {/* Audio Player */}
        <div className="ielts-main">
          <h1 className="ielts-main-title">{sections[currentSection].title}</h1>
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                backgroundColor: "#000",
                margin: "0 auto 1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <span style={{ color: "#fff", fontSize: "2rem" }}>{isPlaying ? "⏸" : "▶"}</span>
            </div>
            <p style={{ color: "#666" }}>Duration: {sections[currentSection].duration}</p>
          </div>
        </div>

        {/* Questions */}
        <div className="ielts-practice-panel">
          <h3 className="ielts-panel-title">Answer Questions</h3>
          {[1, 2, 3].map((q) => (
            <div key={q} style={{ marginBottom: "0.75rem" }}>
              <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.875rem" }}>Question {q}:</label>
              <input
                type="text"
                placeholder="Write your answer"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "0.375rem",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
