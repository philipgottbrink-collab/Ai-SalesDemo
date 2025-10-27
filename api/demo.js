import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export default async function handler(req, res) {
  let userPrompt;

  try {
    if (req.method === "POST") {
      // Make sure to parse JSON properly
      const body = await new Promise((resolve, reject) => {
        let data = "";
        req.on("data", chunk => (data += chunk));
        req.on("end", () => resolve(JSON.parse(data || "{}")));
        req.on("error", reject);
      });
      userPrompt = body.prompt;
    }

    // Fallback demo text
    if (!userPrompt) {
      userPrompt = "Hej! Detta är en demo för din AI-röstassistent.";
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Du är en hjälpsam AI-röstassistent för frisörsalonger." },
        { role: "user", content: userPrompt },
      ],
    });

    res.status(200).json({ message: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error: " + err.message });
  }
}
