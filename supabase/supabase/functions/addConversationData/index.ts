// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://jztjcupusfengxvmcupg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6dGpjdXB1c2Zlbmd4dm1jdXBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MzQ4MTYsImV4cCI6MjA1ODAxMDgxNn0.s9W3D4zu0tZuFRY45GJLKDn6fIIimNsm0Xwmkn5hXV8'
const elvenLabsHmac = "wsec_050ca22dd1a8ed524e37c0d70146e0036d591399e8570bbb02f6b8dd4b05dad2"

Deno.serve(async (req) => {
  // Validate ElevenLabs signature
  const signatureHeader = req.headers.get('ElevenLabs-Signature')
  if (!signatureHeader) {
    return new Response('Missing ElevenLabs signature header', { status: 401 })
  }

  // Parse signature components
  const parts = signatureHeader.split(',')
  const tPart = parts.find(p => p.startsWith('t='))
  const v0Part = parts.find(p => p.startsWith('v0='))

  if (!tPart || !v0Part) {
    return new Response('Invalid signature format', { status: 401 })
  }

  const timestamp = tPart.slice(2)
  const receivedSignature = v0Part

  // Validate timestamp freshness (30 minutes)
  const requestTime = parseInt(timestamp) * 1000
  if (Date.now() - requestTime > 30 * 60 * 1000) {
    return new Response('Expired request', { status: 403 })
  }

  // Read raw request body
  const rawBody = new Uint8Array(await new Response(req.body).arrayBuffer())
  const bodyText = new TextDecoder().decode(rawBody)

  // Generate HMAC signature
  const message = `${timestamp}.${bodyText}`
  const encoder = new TextEncoder()
  
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(elvenLabsHmac),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )

  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(message)
  )

  // Convert signature to hexadecimal
  const signatureArray = Array.from(new Uint8Array(signatureBuffer))
  const computedSignature = `v0=${signatureArray.map(b => 
    b.toString(16).padStart(2, '0')).join('')}`

  // Validate signature match
  if (computedSignature !== receivedSignature) {
    return new Response('Invalid signature', { status: 401 })
  }

  // Process valid request
  const { data } = JSON.parse(bodyText)
  const { agent_id, conversation_id, transcript } = data
  const callDuration = data.metadata.call_duration_secs

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  // Store conversation data
  const { data: userMessage, error: userMessageError } = await supabase
    .from('Call')
    .insert({
      conversation_id,
      agent_id,
      transcript: JSON.stringify(transcript),
      call_duration: callDuration,
    })
    .select()
    .single()

  if (userMessageError) {
    return new Response(
      JSON.stringify({ error: userMessageError.message }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    )
  }

  return new Response(
    JSON.stringify({ message: 'Data inserted successfully', userMessage }),
    { headers: { "Content-Type": "application/json" } }
  )
})
/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/addConversationData' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
