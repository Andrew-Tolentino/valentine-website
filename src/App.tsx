import { useState, useEffect, CSSProperties } from 'react'
import './App.css'

interface NoButtonStyle extends CSSProperties {
  position: 'relative';
  left: number;
  top: number;
}

function App() {
  const [hasAccepted, setHasAccepted] = useState<boolean>(false)
  const [timeRemaining, setTimeRemaining] = useState<string>('')
  const [isValentinesDay, setIsValentinesDay] = useState<boolean>(false)
  const [noButtonStyle, setNoButtonStyle] = useState<NoButtonStyle>({ 
    position: 'relative', 
    left: 0, 
    top: 0 
  })

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

  const handleNoHover = () => {
    const randomX = Math.random() * 200 - 100
    const randomY = Math.random() * 200 - 100
    setNoButtonStyle({
      position: 'relative',
      left: randomX,
      top: randomY,
      transition: 'all 0.3s ease'
    })
  }

  if (hasAccepted && isValentinesDay) {
    return (
      <div className="container">
        <div className="content valentine-day">
          <div className="emoji-large">💕</div>
          <h1 className="title">Happy Valentine's Day!</h1>
          <p className="subtitle">This day is finally here! 💖</p>
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
            onMouseEnter={handleNoHover}
            style={noButtonStyle}
            className="btn btn-no"
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
