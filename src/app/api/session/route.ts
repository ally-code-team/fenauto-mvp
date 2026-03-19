import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error("OPENAI_API_KEY not found in environment");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }
    
    console.log("Creating realtime session with key:", apiKey.substring(0, 10) + "...");
    
    const response = await fetch(
      "https://api.openai.com/v1/realtime/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-realtime-preview-2024-12-17",
          voice: "alloy"
        }),
      }
    );
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenAI API error:", response.status, errorData);
      return NextResponse.json(
        { error: "Failed to create session", details: errorData },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    console.log("Session created successfully:", JSON.stringify(data).substring(0, 100) + "...");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /session:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
