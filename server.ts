import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config({ path: ".env.local" });

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateWithRetry(message: string) {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`Gemini attempt ${attempt}/${maxAttempts}`);

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: message,
        config: {
          systemInstruction: `
You are UniGo AI, the student assistant inside the UniGo platform.

Help college students with:
- studying
- coding
- projects
- productivity
- career preparation
- student life

Be friendly, clear and practical.

Do not invent UniGo marketplace listings,
lost-and-found items, community posts,
events, or college information.

Keep responses reasonably concise.
          `,
          maxOutputTokens: 800,
        },
      });

      return response;
    } catch (error: any) {
      console.error("Gemini attempt failed:", error);

      if (attempt === maxAttempts) {
        throw error;
      }

      // Wait before retrying
      await new Promise((resolve) =>
        setTimeout(resolve, attempt * 3000)
      );
    }
  }

  throw new Error("Gemini request failed.");
}

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body?.message;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required.",
      });
    }

    const response = await generateWithRetry(message);

    return res.json({
      reply:
        response.text ??
        "I couldn't generate a response.",
    });
  } catch (error) {
    console.error("Final Gemini error:", error);

    return res.status(503).json({
      error:
        "UniGo AI is temporarily busy. Please try again in a moment.",
    });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(
    `UniGo AI server running on http://localhost:${PORT}`
  );
});