import { defineMiddleware } from "astro:middleware";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const onRequest = defineMiddleware((context, next) => {
  if (context.request.method === "OPTIONS" && context.url.pathname.startsWith("/api/")) {
    return new Response(null, {
      status: 204,
      headers: {
        ...corsHeaders,
        "Access-Control-Max-Age": "86400",
      },
    });
  }
  return next();
});
