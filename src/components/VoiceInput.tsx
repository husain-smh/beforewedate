'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Mic, Loader2 } from 'lucide-react'

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

  // Click handler that toggles recording
  const handleClick = () => {
    if (disabled || isProcessing) return

    if (isRecording) {
      // If currently recording, stop it
      stopRecording()
    } else {
      // If not recording, start it
    startRecording()
    }
  }

  return (
    <div className="voice-input-container" style={{ 
      position: 'relative', 
      display: 'flex', 
      flexDirection: 'column',
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

        .voice-input-button.processing {
          background: linear-gradient(135deg, var(--color-button-primary-start), var(--color-button-primary-end));
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>

      {/* Microphone Button */}
      <motion.button
        className={`voice-input-button ${isRecording ? 'recording' : ''} ${isProcessing ? 'processing' : ''}`}
        onClick={handleClick}
        disabled={disabled || isProcessing}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: (isRecording || isProcessing) ? 1.25 : 1,
          boxShadow: (isRecording || isProcessing)
            ? '0 0 30px rgba(244, 114, 182, 0.6)'
            : 'var(--shadow-lg)',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        {isProcessing ? (
          <Loader2 className="w-7 h-7 animate-spin" />
        ) : (
        <Mic className="w-7 h-7" />
        )}
      </motion.button>

      {/* Status Text */}
      <AnimatePresence>
        {(isRecording || isProcessing) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            style={{
              marginTop: 'calc(var(--mic-size-active) / 2 + var(--spacing-lg))',
              textAlign: 'center',
              width: '100%'
            }}
          >
            <span style={{
              fontSize: 'var(--font-size-sm)',
              color: isProcessing 
                ? 'var(--color-text-secondary)' 
                : 'var(--color-button-primary-start)',
              fontWeight: 'var(--font-weight-medium)'
            }}>
              {isProcessing ? 'Transcribing...' : 'Listening...'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

