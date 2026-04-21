import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

export const runtime = 'nodejs';

const NOTIFY_TO = 'josue.23.glez@gmail.com';

const payloadSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'invalid_body' },
      { status: 400 }
    );
  }

  const parsed = payloadSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'invalid_email' },
      { status: 400 }
    );
  }

  const { email } = parsed.data;

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.error(
      '[community-notify] Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment.'
    );
    return NextResponse.json(
      { error: 'email_not_configured' },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Sacred Library" <${user}>`,
      to: NOTIFY_TO,
      replyTo: email,
      subject: 'Nueva inscripción a Círculos Comunitarios',
      text: `Se ha inscrito un nuevo correo a la lista de espera de Círculos Comunitarios:\n\n${email}\n\nFecha: ${new Date().toISOString()}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #111;">Nueva inscripción a Círculos Comunitarios</h2>
          <p style="color: #333; font-size: 15px; line-height: 1.5;">
            Se ha inscrito un nuevo correo a la lista de espera:
          </p>
          <p style="font-size: 18px; font-weight: 600; background: #f4f4f8; padding: 12px 16px; border-radius: 8px; color: #111;">
            ${email}
          </p>
          <p style="color: #888; font-size: 12px; margin-top: 24px;">
            Fecha: ${new Date().toLocaleString('es-ES')}
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[community-notify] Failed to send email:', err);
    return NextResponse.json(
      { error: 'send_failed' },
      { status: 500 }
    );
  }
}
