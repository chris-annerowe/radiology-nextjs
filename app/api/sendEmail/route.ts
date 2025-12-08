import { NextResponse } from 'next/server';
import { mailOptions, transporter } from '@/config/nodemailer'

export async function POST(req: any) {
    if (req.method === 'POST') {
      const { subject, text } = req.body;
  

      // Send mail with defined transport object
      try {
        await transporter.sendMail({
          ...mailOptions,
          subject: "Test Subject",
          text: 'Test Text',
          html: '<h1>Test Title</h1><p>Test body data</p>'
        });
        console.log("Trying to email")
  
        return NextResponse.json({ message: 'Email sent successfully!', status: 200 });
      } catch (error) {
        console.log("Failing to email")
        return NextResponse.json({ message: 'Error sending email', error, status: 500 });
      }
    } else {
        console.log("Confusing reason for no email")
      return NextResponse.json({ message: 'Method not allowed', status: 405 });
    }
  }