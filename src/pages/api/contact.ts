export const prerender = false;

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      ...corsHeaders,
      "Access-Control-Max-Age": "86400",
    },
  });
}

export async function POST({ request }: { request: Request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const company = formData.get("company") || "";
  const phone = formData.get("phone") || "";
  const subject = formData.get("subject");
  const message = formData.get("message");

  if (!name || !email || !subject || !message) {
    return new Response(JSON.stringify({ ok: false, error: "Missing fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  const { Resend } = await import("resend");
  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  const subjectLabels: Record<string, string> = {
    "digital-twins": "Digital Twin Development",
    "3d-modelling": "3D Modelling & Visualization",
    "virtual-spaces": "Virtual & Immersive Spaces",
    "consulting": "Consulting & Advisory",
    "partnership": "Partnership Opportunities",
    "other": "Other",
  };
  const subjectText = subjectLabels[subject as string] || subject;

  const html = `
    <p><strong>Name:</strong> ${escapeHtml(String(name))}</p>
    <p><strong>Email:</strong> ${escapeHtml(String(email))}</p>
    <p><strong>Company:</strong> ${escapeHtml(String(company))}</p>
    <p><strong>Phone:</strong> ${escapeHtml(String(phone))}</p>
    <p><strong>Subject:</strong> ${escapeHtml(String(subjectText))}</p>
    <p><strong>Message:</strong></p>
    <pre>${escapeHtml(String(message))}</pre>
  `;

  const { error } = await resend.emails.send({
    from: "E-Compvenience Contact <onboarding@resend.dev>",
    to: ["runescape2491@gmail.com"],
    replyTo: String(email),
    subject: `Contact: ${subjectText} - ${String(name)}`,
    html,
  });

  if (error) {
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] || c
  );
}
