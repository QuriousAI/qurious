import { components } from "./_generated/api";
import { Resend } from "@convex-dev/resend";
import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const resend: Resend = new Resend(components.resend, {
  // Set testMode to false in production to allow sending to real email addresses
  // For now, keeping it true for safety - set to false when ready for production
  testMode: false,
});

export const sendWelcomeEmail = internalMutation({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const { email, name } = args;

    await resend.sendEmail(ctx, {
      from: "Qurious <onboarding@resend.dev>", // TODO: Update with your actual domain
      to: email,
      subject: "Welcome to Qurious! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 32px;">Welcome to Qurious!</h1>
            </div>
            <div style="background: #ffffff; padding: 40px 20px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <p style="font-size: 18px; margin-top: 0;">Hi ${name || "there"},</p>
              <p>We're thrilled to have you join Qurious! 🎉</p>
              <p>You now have <strong>100 credits</strong> to get started exploring research papers, creating summaries, and discovering insights.</p>
              <p>Here's what you can do:</p>
              <ul style="padding-left: 20px;">
                <li>Search and explore research papers</li>
                <li>Create summaries and study snapshots</li>
                <li>Organize papers in folders</li>
                <li>Get AI-powered insights and suggestions</li>
              </ul>
              <p>If you have any questions, feel free to reach out. We're here to help!</p>
              <p style="margin-top: 30px;">Happy researching!<br>The Qurious Team</p>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
              <p>© ${new Date().getFullYear()} Qurious. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
      text: `Hi ${name || "there"},

We're thrilled to have you join Qurious! 🎉

You now have 100 credits to get started exploring research papers, creating summaries, and discovering insights.

Here's what you can do:
- Search and explore research papers
- Create summaries and study snapshots
- Organize papers in folders
- Get AI-powered insights and suggestions

If you have any questions, feel free to reach out. We're here to help!

Happy researching!
The Qurious Team

© ${new Date().getFullYear()} Qurious. All rights reserved.`,
    });
  },
});
