'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Mic } from 'lucide-react'

interface VoiceInputProps {
  onTranscription: (text: string) => void
  disabled?: boolean
}

export function VoiceInput({ onTranscription, disabled = false }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      })
      
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        if (audioChunksRef.current.length === 0) return

        setIsProcessing(true)
        
        try {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
          const formData = new FormData()
          formData.append('audio', audioBlob, 'recording.webm')

          const response = await fetch('/api/transcribe', {
            method: 'POST',
            body: formData,
          })

          if (response.ok) {
            const data = await response.json()
            if (data.text) {
              onTranscription(data.text)
            }
          } else {
            console.error('Transcription failed')
          }
        } catch (error) {
          console.error('Error transcribing audio:', error)
        } finally {
          setIsProcessing(false)
          audioChunksRef.current = []
          
          // Stop all tracks
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop())
            streamRef.current = null
          }
        }
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Microphone access denied. Please enable microphone permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleMouseDown = () => {
    if (disabled || isProcessing) return
    startRecording()
  }

  const handleMouseUp = () => {
    if (isRecording) {
      stopRecording()
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    if (disabled || isProcessing) return
    startRecording()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault()
    if (isRecording) {
      stopRecording()
    }
  }

  return (
    <div className="voice-input-container" style={{ 
      position: 'relative', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: 'var(--spacing-lg)',
      width: '100%'
    }}>
      <style>{`
        .voice-input-container {
          --mic-size: 64px;
          --mic-size-active: 80px;
          --wave-color: var(--color-button-primary-start);
        }

        .voice-input-button {
          position: relative;
          width: var(--mic-size);
          height: var(--mic-size);
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, var(--color-button-primary-start), var(--color-button-primary-end));
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: var(--shadow-lg);
          transition: all var(--transition-base) ease;
          z-index: 10;
          touch-action: none;
        }

        .voice-input-button:active,
        .voice-input-button.recording {
          width: var(--mic-size-active);
          height: var(--mic-size-active);
          box-shadow: 0 0 20px rgba(244, 114, 182, 0.5);
        }

        .voice-input-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .voice-input-button svg {
          color: var(--color-button-text);
          width: 28px;
          height: 28px;
          transition: transform var(--transition-base) ease;
        }

        .voice-input-button.recording svg {
          transform: scale(1.1);
        }

        .wave-lines {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
          pointer-events: none;
          z-index: 1;
        }

        .wave-line {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 3px;
          height: 80px;
          background: linear-gradient(to bottom, 
            transparent 0%, 
            var(--wave-color) 20%, 
            var(--wave-color) 80%, 
            transparent 100%);
          transform-origin: center bottom;
          opacity: 0;
          border-radius: 2px;
          filter: blur(1px);
        }

        .wave-line-left {
          --wave-distance: -120px;
          --wave-angle-start: -5deg;
          --wave-angle-mid: -25deg;
          --wave-angle-end: -10deg;
        }

        .wave-line-right {
          --wave-distance: 120px;
          --wave-angle-start: 5deg;
          --wave-angle-mid: 25deg;
          --wave-angle-end: 10deg;
        }

        .wave-line-left.active {
          animation: waveFlowLeft 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .wave-line-right.active {
          animation: waveFlowRight 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes waveFlowLeft {
          0% {
            transform: translate(-50%, -50%) translateX(0) translateY(0) scaleY(0.3) rotate(var(--wave-angle-start));
            opacity: 0;
          }
          20% {
            transform: translate(-50%, -50%) translateX(-25px) translateY(-5px) scaleY(0.6) rotate(-12deg);
            opacity: 0.5;
          }
          40% {
            transform: translate(-50%, -50%) translateX(-50px) translateY(-8px) scaleY(0.9) rotate(var(--wave-angle-mid));
            opacity: 0.8;
          }
          60% {
            transform: translate(-50%, -50%) translateX(-75px) translateY(-5px) scaleY(1) rotate(-18deg);
            opacity: 0.9;
          }
          80% {
            transform: translate(-50%, -50%) translateX(-100px) translateY(-2px) scaleY(0.7) rotate(var(--wave-angle-end));
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) translateX(-120px) translateY(0) scaleY(0.2) rotate(-5deg);
            opacity: 0;
          }
        }

        @keyframes waveFlowRight {
          0% {
            transform: translate(-50%, -50%) translateX(0) translateY(0) scaleY(0.3) rotate(var(--wave-angle-start));
            opacity: 0;
          }
          20% {
            transform: translate(-50%, -50%) translateX(25px) translateY(-5px) scaleY(0.6) rotate(12deg);
            opacity: 0.5;
          }
          40% {
            transform: translate(-50%, -50%) translateX(50px) translateY(-8px) scaleY(0.9) rotate(var(--wave-angle-mid));
            opacity: 0.8;
          }
          60% {
            transform: translate(-50%, -50%) translateX(75px) translateY(-5px) scaleY(1) rotate(18deg);
            opacity: 0.9;
          }
          80% {
            transform: translate(-50%, -50%) translateX(100px) translateY(-2px) scaleY(0.7) rotate(var(--wave-angle-end));
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) translateX(120px) translateY(0) scaleY(0.2) rotate(5deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Wave Lines Container */}
      <AnimatePresence>
        {isRecording && (
          <div className="wave-lines">
            {/* Left side waves - more waves for flowy effect */}
            {[...Array(8)].map((_, i) => (
              <div
                key={`left-${i}`}
                className="wave-line wave-line-left active"
                style={{
                  animationDelay: `${i * 0.25}s`,
                }}
              />
            ))}
            {/* Right side waves - more waves for flowy effect */}
            {[...Array(8)].map((_, i) => (
              <div
                key={`right-${i}`}
                className="wave-line wave-line-right active"
                style={{
                  animationDelay: `${i * 0.25}s`,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Microphone Button */}
      <motion.button
        className={`voice-input-button ${isRecording ? 'recording' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        disabled={disabled || isProcessing}
        whileTap={isRecording ? { scale: 1.1 } : { scale: 0.95 }}
        animate={{
          scale: isRecording ? 1.25 : 1,
          boxShadow: isRecording
            ? '0 0 30px rgba(244, 114, 182, 0.6)'
            : 'var(--shadow-lg)',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        <Mic className="w-7 h-7" />
      </motion.button>
    </div>
  )
}

