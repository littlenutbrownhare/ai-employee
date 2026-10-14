import Anthropic from "@anthropic-ai/sdk";

export async function GET() {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "API key is not set" }, { status: 500 });
  }

  const client = new Anthropic();

  const message = await client.messages.create({
    model: "claude-sonnet-5-5",
    max_tokens: 200,
    messages: [
      { role: "user", content: "Say hello to Mafy in one short sentence." },
    ],
  });

  const first = message.content[0];
  const reply = first.type === "text" ? first.text : "";

  return Response.json({ reply });
}