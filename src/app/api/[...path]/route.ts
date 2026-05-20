import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

async function handler(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    // 🔥 FIX AQUÍ
    const { path } = await context.params;

    const finalPath = path?.join("/") || "";
    const url = `${BACKEND_URL}${finalPath}`;
    const method = req.method;

    console.log("🟡 ===== PROXY REQUEST =====");
    console.log("➡️ METHOD:", method);
    console.log("➡️ PATH:", finalPath);
    console.log("➡️ URL BACKEND:", url);

    let body;

    if (method !== "GET") {
      const jsonBody = await req.json();
      body = JSON.stringify(jsonBody);

      console.log("➡️ BODY:", jsonBody);
    }

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        ...(process.env.NODE_ENV === "development" && {
          "ngrok-skip-browser-warning": "true",
        }),
      },
      body,
    });

    console.log("🟢 ===== BACKEND RESPONSE =====");
    console.log("⬅️ STATUS:", response.status);

    const data = await response.json();

    console.log("⬅️ DATA:", data);

    return NextResponse.json(data, { status: response.status });

  } catch (error: any) {
    console.error("🔴 ERROR PROXY:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error en proxy",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };