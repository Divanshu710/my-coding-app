

export async function getAIDebugFeedback(problemTitle, code) {
  const OPENROUTER_API_KEY =import.meta.env.VITE_OPENROUTER_API_KEY ; 
  console.log(OPENROUTER_API_KEY);
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct", 
        messages: [
          {
            role: "system",
            content: "You're a helpful code debugging assistant. Just give the hint what is wrong. And if now wrong just tell if it can be more optimised or not",
          },
          {
            role: "user",
            content: `Problem Title:\n${problemTitle}\n\nUser Code:\n${code}`,
          },
        ],
      }),
    });

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content;
    return message || "No helpful response.";
  } catch (error) {
    console.error("AI Debug Error:", error.message);
    return "Failed to contact AI Debug API.";
  }
}

// src/services/aiDebug.js

export async function getTimeSpaceComplexity(problemTitle, code) {
  const OPENROUTER_API_KEY =import.meta.env.VITE_OPENROUTER_API_KEY ; // 🔐 You may want to move this to .env for production

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct", // or meta-llama/llama-3-8b-instruct
        messages: [
          {
            role: "system",
            content: "You're a helpful code debugging assistant. Give me Time Complexity and Space Complexity in one word in Big O notation without explanation",
          },
          {
            role: "user",
            content: `Problem Title:\n${problemTitle}\n\nUser Code:\n${code}`,
          },
        ],
      }),
    });

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content;
    return message || "No helpful response.";
  } catch (error) {
    console.error("AI Debug Error:", error);
    return "Failed to contact AI Debug API.";
  }
}
