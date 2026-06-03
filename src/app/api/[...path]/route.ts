import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

async function handler(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await context.params;

    const finalPath = path?.join("/") || "";
    const url = `${BACKEND_URL}${finalPath}${req.nextUrl.search}`;

    const method = req.method;

    console.log("🟡 ===== PROXY REQUEST =====");
    console.log("➡️ METHOD:", method);
    console.log("➡️ PATH:", finalPath);
    console.log("➡️ URL BACKEND:", url);

    // 🔥 LOGS IMPORTANTES
    console.log("📦 HEADERS RECIBIDOS:");
    console.log(Object.fromEntries(req.headers.entries()));

    const authorization = req.headers.get("authorization");

    console.log("🔑 AUTHORIZATION:", authorization);

    let body: string | undefined;

    if (
      method !== "GET" &&
      method !== "DELETE"
    ) {
      const jsonBody = await req.json();

      body = JSON.stringify(jsonBody);

      console.log("➡️ BODY:", jsonBody);
    }

    console.log("📤 HEADERS ENVIADOS AL BACKEND:");
    console.log({
      Authorization: authorization,
    });

    const response = await fetch(url, {
      method,

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",

        ...(authorization && {
          Authorization: authorization,
        }),

        ...(process.env.NODE_ENV === "development" && {
          "ngrok-skip-browser-warning": "true",
        }),
      },

      body,
    });

    console.log("HEADERS FETCH:", {
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-Requested-With": "XMLHttpRequest",
  "ngrok-skip-browser-warning": "true",
});
    console.log("🟢 ===== BACKEND RESPONSE =====");
    console.log("⬅️ RESPONSE URL:", response.url);
    console.log("⬅️ STATUS:", response.status);

    console.log(
      "⬅️ RESPONSE HEADERS:"
    );
    console.log(
      Object.fromEntries(
        response.headers.entries()
      )
    );

    const data = await response.json();

    console.log("⬅️ DATA:", data);

    return NextResponse.json(data, {
      status: response.status,
    });

  } catch (error: any) {
    console.error("🔴 ERROR PROXY:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error en proxy",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as DELETE,
  handler as PATCH,
};