"use client"

import { useState } from "react"
import { Mic, BookOpen, Headphones, PenTool } from "lucide-react"
import Dock from "./assets/components/dock/app.jsx"
import SpeakingPage from "./pages/speaking/app.jsx"
import ReadingPage from "./pages/reading/app.jsx"
import ListeningPage from "./pages/listening/app.jsx"
import WritingPage from "./pages/writing/app.jsx"
import ieltsLogo from "./assets/media/images/logo.png"
import "./App.css"
import "./assets/components/dock/app.css"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("speaking")

  const dockItems = [
    {
      icon: <Mic size={24}/>,
      label: "Speaking",
      onClick: () => setCurrentPage("speaking"),
    },
    {
      icon: <BookOpen size={24} />,
      label: "Reading",
      onClick: () => setCurrentPage("reading"),
    },
    {
      icon: <Headphones size={24} />,
      label: "Listening",
      onClick: () => setCurrentPage("listening"),
    },
    {
      icon: <PenTool size={24} />,
      label: "Writing",
      onClick: () => setCurrentPage("writing"),
    },
  ]

  // GitHub URL for the attribution link
  const GITHUB_URL = "https://github.com/congminh13/"

  return (
    <>
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#ffffff", color: "#000000", overflow: "hidden" }}>
      {currentPage === "speaking" && <SpeakingPage />}
      {currentPage === "reading" && <ReadingPage />}
      {currentPage === "listening" && <ListeningPage />}
      {currentPage === "writing" && <WritingPage />}
    </div>
    
    {/* Logo positioned outside the dock */}
    <div className="app-logo-container">
      <img src={ieltsLogo} alt="IELTS Logo" className="app-logo" />
    </div>
    
    {/* Attribution positioned outside the dock */}
    <div className="app-attribution">
      <span className="app-attribution-text">
        Made with ❤️ by 
        <a 
          href={GITHUB_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="app-attribution-link"
        >
          <strong>congminh</strong>
        </a>
      </span>
    </div>
    
    <Dock
        items={dockItems}
        panelHeight={68}
        baseItemSize={50}
        magnification={65}
        distance={200}
        dockHeight={256}
        spring={{ mass: 0.1, stiffness: 150, damping: 12 }}
      />
    </>
  )
}
