import axios from "axios";

// Base URL for Judge0 RapidAPI
const JUDGE0_API = "https://judge0-ce.p.rapidapi.com";


// Common headers with your key
const headers = {
  "content-type": "application/json",
  "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
  "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY 
};

// Create a new code submission
export async function createSubmission(source_code, language_id, stdin) {
  try {
    const res = await axios.post(
      `${JUDGE0_API}/submissions?base64_encoded=false&wait=false`,
      {
        source_code,
        language_id,
        stdin
      },
      { headers }
    );

    return res.data.token;
  } catch (error) {
    console.error("Error creating submission:", error);
    throw error;
  }
}

// Get the result of a submission
export async function getSubmissionResult(token) {
  try {
    const res = await axios.get(
      `${JUDGE0_API}/submissions/${token}?base64_encoded=false`,
      { headers }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching submission result:", error);
    throw error;
  }
}
