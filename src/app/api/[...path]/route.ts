import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

async function handler(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await context.params;

    if (!BACKEND_URL) {
      return NextResponse.json(
        {
          success: false,
          message: "NEXT_PUBLIC_API_URL no está configurado",
        },
        { status: 500 }
      );
    }

    const finalPath = path?.join("/") || "";
    const url = `${BACKEND_URL}${finalPath}${req.nextUrl.search}`;
    const method = req.method;

    console.log("🟡 ===== PROXY REQUEST =====");
    console.log("➡️ METHOD:", method);
    console.log("➡️ PATH:", finalPath);
    console.log("➡️ URL BACKEND:", url);

    console.log("📦 HEADERS RECIBIDOS:");
    console.log(Object.fromEntries(req.headers.entries()));

    const authorization = req.headers.get("authorization");
    const contentType = req.headers.get("content-type");

    console.log("🔑 AUTHORIZATION:", authorization);
    console.log("📦 CONTENT-TYPE:", contentType);

    const isAuthRoute =
      finalPath === "auth/login" ||
      finalPath === "auth/register" ||
      finalPath.includes("auth/forgot-password") ||
      finalPath.includes("auth/reset-password");

    const headers: HeadersInit = {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      ...(process.env.NODE_ENV === "development" && {
        "ngrok-skip-browser-warning": "true",
      }),
    };

    if (contentType) {
      headers["Content-Type"] = contentType;
    }

    if (authorization && !isAuthRoute) {
      headers.Authorization = authorization;
    }

    let body: BodyInit | undefined = undefined;

    if (method !== "GET" && method !== "HEAD") {
      const rawBody = await req.arrayBuffer();
      body = rawBody;

      console.log("➡️ BODY TYPE:", contentType);
      console.log("➡️ BODY SIZE:", rawBody.byteLength);
    }

    console.log("📤 HEADERS ENVIADOS AL BACKEND:");
    console.log(headers);

    const response = await fetch(url, {
      method,
      headers,
      body,
      redirect: "manual",
    });

    const rawText = await response.text();

    console.log("🟢 ===== BACKEND RESPONSE =====");
    console.log("⬅️ RESPONSE URL:", response.url);
    console.log("⬅️ STATUS:", response.status);

    console.log("⬅️ RESPONSE HEADERS:");
    console.log(Object.fromEntries(response.headers.entries()));

    console.log("⬅️ RAW TEXT:", rawText);

    let data: unknown;

    try {
      data = JSON.parse(rawText);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "El backend no devolvió JSON",
          raw: rawText,
        },
        {
          status: response.status || 500,
        }
      );
    }

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