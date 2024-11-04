import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import type { RequestHandler } from './$types';

// Create a transporter (I'll show Gmail example)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,     // Your Gmail address
        pass: process.env.EMAIL_PASSWORD  // Your Gmail app password
    }
});

export const POST: RequestHandler = async ({ request }) => {
    try {
        const formData = await request.json();
        
        // Format the email content
        const emailContent = Object.entries(formData)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');

        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,    // Where you want to receive the emails
            subject: 'New Form Submission',
            text: emailContent,
            // You can also use HTML:
            html: `
                <h2>New Form Submission</h2>
                <pre>${emailContent}</pre>
            `
        });

        return json({ success: true });
    } catch (error) {
        console.error('Email error:', error);
        return json({ success: false, error: 'Failed to send email' }, { status: 500 });
    }
};