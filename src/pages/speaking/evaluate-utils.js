const N8N_URL = process.env.REACT_APP_ISP_N8N_URL || "https://n8n.gfm.io.vn/webhook/isp-aia"
const API_KEY = process.env.REACT_APP_ISP_N8N_KEY || ""

export async function evaluateTask(payload, { signal } = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(API_KEY ? { "x-api-key": API_KEY } : {}),
  }

  try {
    const res = await fetch(N8N_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal,
      cache: "no-store",
    })

    if (!res.ok) {
      const text = await res.text().catch(() => "")
      console.error("[v0] API Error Response:", res.status, text)
      throw new Error(`Evaluation failed: ${res.status} ${text || "Unknown error"}`)
    }

    const contentLength = res.headers.get("content-length")
    const contentType = res.headers.get("content-type")

    console.log("[v0] Response headers - Content-Length:", contentLength, "Content-Type:", contentType)

    // Get response text first to debug
    const text = await res.text()
    console.log("[v0] Raw response text:", text)

    if (!text || text.trim() === "") {
      throw new Error("Empty response from evaluation API")
    }

    // Try to parse JSON
    let json
    try {
      json = JSON.parse(text)
    } catch (parseErr) {
      console.error("[v0] JSON parse error:", parseErr.message)
      console.error("[v0] Response text was:", text.substring(0, 500))
      throw new Error(`Invalid JSON response: ${parseErr.message}`)
    }

    // Check if response is empty or invalid
    if (!json || (Array.isArray(json) && json.length === 0)) {
      throw new Error("Empty response from evaluation API")
    }

    console.log("[v0] Parsed JSON:", json)

    // Extract output from array response
    const output = Array.isArray(json) ? json[0]?.output : json.output

    if (!output) {
      console.error("[v0] Invalid response structure:", json)
      throw new Error("Invalid evaluation response structure: missing output")
    }

    const transformedResult = transformEvaluationResponse(output)
    console.log("[v0] Transformed result:", transformedResult)

    return transformedResult
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("Evaluation cancelled")
    }
    console.error("[v0] Evaluation error:", err.message)
    throw err
  }
}

function transformEvaluationResponse(output) {
  const { evaluation, overallBand, overallFeedback, taskId } = output

  if (!evaluation || typeof overallBand !== "number") {
    throw new Error("Invalid evaluation response structure")
  }

  // Extract scores and justifications from evaluation object
  const scores = {
    fluencyCoherence: evaluation.fluencyCoherence?.score || 0,
    lexicalResource: evaluation.lexicalResource?.score || 0,
    grammaticalRange: evaluation.grammaticalRangeAccuracy?.score || 0,
    pronunciation: evaluation.pronunciation?.score || 0,
    overallBand: overallBand,
  }

  const justifications = {
    fluencyCoherence: evaluation.fluencyCoherence?.justification || "",
    lexicalResource: evaluation.lexicalResource?.justification || "",
    grammaticalRange: evaluation.grammaticalRangeAccuracy?.justification || "",
    pronunciation: evaluation.pronunciation?.justification || "",
  }

  return {
    scores,
    justifications,
    strengths: [], // API doesn't provide this, can be added later
    weaknesses: [], // API doesn't provide this, can be added later
    modelAnswer: "", // API doesn't provide this, can be added later
    confidence: 0.8, // Default confidence since API doesn't provide it
    notes: overallFeedback || "",
    taskId: taskId || "",
  }
}

export function saveEvaluationLocally(taskId, payload, result) {
  try {
    const evaluation = {
      payload,
      result,
      createdAt: Date.now(),
    }
    localStorage.setItem(`evaluation:${taskId}`, JSON.stringify(evaluation))
  } catch (e) {
    console.error("Failed to save evaluation:", e)
  }
}

export function getEvaluationLocally(taskId) {
  try {
    const raw = localStorage.getItem(`evaluation:${taskId}`)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    return null
  }
}

export function getAllEvaluations() {
  try {
    const evaluations = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith("evaluation:")) {
        const taskId = key.replace("evaluation:", "")
        evaluations[taskId] = JSON.parse(localStorage.getItem(key))
      }
    }
    return evaluations
  } catch (e) {
    return {}
  }
}
