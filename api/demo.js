import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure your API key is set in Vercel Environment Variables
});

export default async function handler(req, res) {
  try {
    // Example prompt for demo purposes
    const demoPrompt = `Hej! Detta är en demo för din AI-röstassistent.`;

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Du är en hjälpsam AI-röstassistent för frisörsalonger." },
        { role: "user", content: demoPrompt }
      ],
    });

    // Return the AI's response
    res.status(200).json({ message: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error: " + err.message });
  }
}
