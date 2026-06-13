import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const body = await req.json();
    const { bullet_point, jd_context } = body;

    if (!bullet_point) {
      return NextResponse.json({ error: "Missing bullet point text" }, { status: 400 });
    }

    const fastApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    
    const response = await fetch(`${fastApiUrl}/api/rewrite-bullet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bullet_point, jd_context: jd_context || "" }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: `FastAPI Error: ${errText}` }, { status: response.status });
    }

    const data = await response.json();

    if (session?.user?.id) {
      await db.aiUsage.create({
        data: {
          userId: session.user.id,
          operation: "bullet_rewrite",
          tokensUsed: 250, // Roughly estimated
          processingTimeMs: 800
        }
      });
    }

    return NextResponse.json(data);
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
