import { GoogleGenerativeAI } from "@google/generative-ai";

// This function will be used for debugging feedback.
export async function getAIDebugFeedback(problemTitle, code) {
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  console.log(GEMINI_API_KEY)
  if (!GEMINI_API_KEY) {
    console.error("Gemini API Key not found.");
    return "Failed to contact AI Debug API.";
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  // CORRECTED LINE: Updated the model name for better compatibility.
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  try {
    const prompt = `You're a helpful code debugging assistant. Just give a hint about what is wrong. If there is nothing wrong, just tell the user if it can be more optimized or not.\n\nProblem Title:\n${problemTitle}\n\nUser Code:\n${code}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text || "No helpful response.";
  } catch (error) {
    console.error("AI Debug Error:", error);
    return "Failed to contact AI Debug API down.";
  }
}

// This function will be used for getting time and space complexity.
export async function getTimeSpaceComplexity(problemTitle, code) {
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    console.error("Gemini API Key not found.");
    return "Failed to contact AI Debug API.";
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  // CORRECTED LINE: Updated the model name for better compatibility.
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  try {
    const prompt = `You're a helpful code complexity assistant. Give me the Time Complexity and Space Complexity in a single line, separated by a comma. Use Big O notation without any explanation or extra words. For example: O(n), O(1).\n\nProblem Title:\n${problemTitle}\n\nUser Code:\n${code}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text || "No helpful response.";
  } catch (error) {
    console.error("AI Debug Error:", error);
    return "Failed to contact AI Debug API down.";
  }
}