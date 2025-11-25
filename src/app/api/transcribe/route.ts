import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    // Lazily instantiate client only when a key exists to avoid build-time errors
    const openai = new OpenAI({ apiKey })

    // Get the audio file from the request
    const formData = await request.formData()
    const audioFile = formData.get('audio') as File

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      )
    }

    // Convert File to a format OpenAI can use
    const arrayBuffer = await audioFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Create a File-like object for OpenAI
    const file = new File([buffer], audioFile.name, { type: audioFile.type })

    // Transcribe using OpenAI Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: 'whisper-1',
      language: 'en', // Optional: specify language for better accuracy
    })

    return NextResponse.json({
      text: transcription.text,
    })
  } catch (error: any) {
    console.error('Transcription error:', error)
    
    // Handle specific OpenAI errors
    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'Invalid OpenAI API key' },
        { status: 401 }
      )
    }

    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to transcribe audio', details: error?.message },
      { status: 500 }
    )
  }
}

