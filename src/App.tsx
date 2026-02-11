import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [hasAccepted, setHasAccepted] = useState<boolean>(false)
  const [timeRemaining, setTimeRemaining] = useState<string>('')
  const [isValentinesDay, setIsValentinesDay] = useState<boolean>(false)
  const [noButtonScale, setNoButtonScale] = useState<number>(1)
  const [noButtonText, setNoButtonText] = useState<string>('No')

  useEffect(() => {
    // Check localStorage for acceptance
    const accepted = localStorage.getItem('valentineAccepted')
    if (accepted === 'true') {
      setHasAccepted(true)
    }
  }, [])

  useEffect(() => {
    if (!hasAccepted) return

    const updateCountdown = () => {
      const now = new Date()
      const currentYear = now.getFullYear()
      let valentinesDay = new Date(currentYear, 1, 14) // February 14

      // If Valentine's Day has passed this year, target next year
      if (now > valentinesDay) {
        valentinesDay = new Date(currentYear + 1, 1, 14)
      }

      // Check if today is Valentine's Day
      if (
        now.getDate() === 14 &&
        now.getMonth() === 1 // February (0-indexed)
      ) {
        setIsValentinesDay(true)
        setTimeRemaining('')
        return
      }

      const diff = valentinesDay.getTime() - now.getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [hasAccepted])

  const handleYes = () => {
    localStorage.setItem('valentineAccepted', 'true')
    setHasAccepted(true)
  }

  const handleNoClick = () => {
    const newScale = noButtonScale * 0.8
    setNoButtonScale(newScale)
    
    // Change text based on how many times they've clicked
    if (newScale > 0.6) {
      setNoButtonText('Are you sure?')
    } else if (newScale > 0.4) {
      setNoButtonText('Really?')
    } else if (newScale > 0.2) {
      setNoButtonText('Please? 🥺')
    } else if (newScale > 0.1) {
      setNoButtonText('Think again!')
    } else {
      setNoButtonText('😢')
    }
  }

  if (hasAccepted && isValentinesDay) {
    return (
      <div className="container">
        <div className="content valentine-day">
          <h1 className="title">💕 Happy Valentine's Day 💕</h1>
          <p className="subtitle">I look forward to our virtual date and our future Valentine's Dates in person</p>
          <p className="subtitle">Track Link</p>
        </div>
      </div>
    )
  }

  if (hasAccepted) {
    return (
      <div className="container">
        <div className="content countdown">
          <div className="emoji-large">💕</div>
          <h1 className="title">Yay! 🎉</h1>
          <p className="subtitle">Counting down to our special day...</p>
          <div className="timer-box">
            <div className="timer-display">{timeRemaining}</div>
            <div className="timer-label">until Valentine's Day 💖</div>
          </div>
          <p className="subtitle" style={{ marginBottom: "0px", marginTop: "40px" }}>😙 Please check again on Valentine's Day 😙</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="content question">
        <div className="emoji-pulse">💝</div>
        <h1 className="title">Will you be my Valentine?</h1>
        <p className="subtitle">Please say yes... 🥺</p>
        <div className="button-container">
          <button onClick={handleYes} className="btn btn-yes">
            Yes! 💕
          </button>
          <button 
            onClick={handleNoClick}
            style={{
              transform: `scale(${noButtonScale})`,
              transition: 'all 0.3s ease'
            }}
            className="btn btn-no"
          >
            {noButtonText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
