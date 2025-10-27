import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY, // Make sure your API key is set in Vercel Environment Variables
});

export default async function handler(req, res) {
  try {
    let userPrompt;

    if (req.method === "POST") {
      // Use the prompt sent from the frontend
      const body = await req.json();
      userPrompt = body.prompt;
    }

    // If no prompt provided, use demo text
    if (!userPrompt) {
      userPrompt = "Hej! Detta är en demo för din AI-röstassistent.";
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Du är en hjälpsam AI-röstassistent för frisörsalonger." },
        { role: "user", content: userPrompt }
      ],
    });

    res.status(200).json({ message: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error: " + err.message });
  }
}
