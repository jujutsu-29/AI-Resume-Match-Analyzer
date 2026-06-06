import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Proxy the request to the FastAPI microservice
    const fastApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    
    // Create new FormData for the downstream request
    const downstreamFormData = new FormData();
    downstreamFormData.append("file", file);

    const response = await fetch(`${fastApiUrl}/api/extract-pdf`, {
      method: "POST",
      body: downstreamFormData,
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: `FastAPI Error: ${errText}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
