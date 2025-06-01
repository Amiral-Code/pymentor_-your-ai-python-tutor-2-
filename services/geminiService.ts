
import { GoogleGenAI, GenerateContentResponse, Part } from "@google/genai";
import { GEMINI_MODEL_NAME } from '../constants';
import { AIAssistantMode } from '../types'; // Corrected import

// Ensure API_KEY is accessed from process.env
// The user of this SDK is responsible for ensuring process.env.API_KEY is set.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API key not found. Please set the API_KEY environment variable.");
  // You might want to throw an error or handle this case more gracefully in a real app
  // For this example, we'll let it proceed, and API calls will fail.
}

const ai = new GoogleGenAI({ apiKey: API_KEY! }); // Non-null assertion, as we've checked (or it's assumed to be set)

const SYSTEM_INSTRUCTION_PYTHON_TUTOR = `You are PyMentor, an expert Python programming tutor.
Your goal is to help users learn Python by providing clear, concise, and accurate explanations, code examples, and answers to their questions.
Be encouraging and break down complex topics into understandable parts.
When providing code, ensure it is valid Python 3.
Format code examples using Markdown code fences (\`\`\`python ... \`\`\`).
If asked for a coding challenge, provide a small, well-defined problem suitable for a beginner or intermediate learner, and offer to check their solution.
When explaining errors, be specific about the cause and suggest fixes.`;

async function generateContentWithRetry(prompt: string | Part[], customSystemInstruction?: string): Promise<string> {
  if (!API_KEY) {
    return "Error: Gemini API key not configured.";
  }
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: customSystemInstruction || SYSTEM_INSTRUCTION_PYTHON_TUTOR,
        temperature: 0.6, // Slightly less creative for more factual explanations
        topK: 40,
        topP: 0.9,
      }
    });
    
    let text = response.text.trim();
    return text;

  } catch (error) {
    console.error("Gemini API call failed:", error);
    if (error instanceof Error) {
        if (error.message.includes("API key not valid")) {
            return "Error: The provided API key is not valid. Please check your API_KEY environment variable.";
        }
         return `Error interacting with AI: ${error.message}`;
    }
    return "An unknown error occurred while contacting the AI.";
  }
}

export const explainConcept = async (conceptPrompt: string): Promise<string> => {
  // conceptPrompt might already include context like "Context: ... User's request: ..."
  const prompt = conceptPrompt.includes("User's request:") ? conceptPrompt : `Explain the Python concept: "${conceptPrompt}". Provide a clear explanation and a simple code example if applicable.`;
  return generateContentWithRetry(prompt);
};

export const explainCode = async (codeExplanationPrompt: string): Promise<string> => {
  // codeExplanationPrompt might be just code, or a structured prompt for explaining an error.
  // The system instruction is general enough. If it's just code, this prompt guides it.
  // If it's a structured "Explain this error..." prompt, that structure will guide the AI.
  const prompt = codeExplanationPrompt.includes("Please explain this Python error") 
    ? codeExplanationPrompt 
    : `Explain the following Python code. Break down what each part does and highlight any important concepts:\n\n${codeExplanationPrompt.startsWith('```python') ? codeExplanationPrompt : `\`\`\`python\n${codeExplanationPrompt}\n\`\`\``}`;
  return generateContentWithRetry(prompt);
};

export const answerQuestion = async (questionPrompt: string): Promise<string> => {
  // questionPrompt might already include context like "Context: ... User's request: ..."
  const prompt = questionPrompt.includes("User's request:") ? questionPrompt : `Answer the following Python-related question: "${questionPrompt}".`;
  return generateContentWithRetry(prompt);
};

export const generateCodingChallenge = async (difficulty: string = "beginner"): Promise<string> => {
  const prompt = `Generate a ${difficulty}-level Python coding challenge. Describe the problem clearly and specify the expected input and output.`;
  return generateContentWithRetry(prompt);
};

export const checkCodeSolution = async (challengeDescription: string, userCode: string): Promise<string> => {
  const prompt = `The user was given the following Python coding challenge:
  ---
  ${challengeDescription}
  ---
  Here is their solution:
  \`\`\`python
  ${userCode}
  \`\`\`
  Please review their solution. Is it correct? Does it solve the problem? Provide feedback, and if there are errors or improvements, suggest them kindly.`;
  return generateContentWithRetry(prompt);
};

// Helper to parse Markdown-like responses that might contain code blocks
export const parseAiResponse = (responseText: string): { type: 'text' | 'code'; content: string }[] => {
  const parts = responseText.split(/(\`\`\`python\n[\s\S]*?\n\`\`\`|\`\`\`\n[\s\S]*?\n\`\`\`)/g);
  return parts.filter(part => part && part.trim() !== '').map(part => {
    if (part.startsWith('```python') || part.startsWith('```')) {
      const codeContent = part.replace(/^```python\n|^```\n/,'').replace(/\n```$/,'');
      return { type: 'code', content: codeContent.trim() };
    }
    return { type: 'text', content: part.trim() };
  });
};