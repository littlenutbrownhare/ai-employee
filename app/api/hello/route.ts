import Anthropic from "@anthropic-ai/sdk";

export async function GET() {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "API key is not set" }, { status: 500 });
  }

  const client = new Anthropic();

  const message = await client.messages.create({
    model: "claude-sonnet-5-5",
    max_tokens: 1000,
    system:
      "You are Ana, the On-page SEO Specialist at MAFAGO Office. You report to Mafy. Be brief and plain. If you don't have data for something, say so instead of guessing.",
    messages: [
      {
        role: "user",
        content: "Introduce yourself, then tell me our top keyword this week.",
      },
    ],
  });

  const reply = message.content
  .filter((block) => block.type === "text")
  .map((block) => block.text)
  .join("\n");

  return Response.json({ reply });
}