
import { GoogleGenAI } from '@google/genai';

// IMPORTANT: This file assumes that `process.env.API_KEY` is set in the execution environment.
// In a real-world scenario, you would use a build process or server-side environment to manage this key.
// For this project, we'll simulate its existence.

// A placeholder key, as we can't use a real one on the client-side directly for security.
// The execution environment is expected to replace `process.env.API_KEY` with a valid key.
const apiKey = process.env.API_KEY || 'YOUR_API_KEY_HERE';

if (apiKey === 'YOUR_API_KEY_HERE') {
    console.warn("Using a placeholder API Key for Gemini. Please set up your environment's API_KEY.");
}

export const ai = new GoogleGenAI({ apiKey: apiKey });
