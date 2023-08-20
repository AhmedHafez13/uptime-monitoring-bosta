import nodemailer from 'nodemailer';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email address
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendVerificationEmail(userEmail: string, token: string) {
    const verificationLink = `https://${process.env.DOMAIN_NAME}/verify-email?token=${token}`;
    const emailContent = `Click the following link to verify your email: ${verificationLink}`;

    await this.sendEmail(userEmail, 'Email Verification', emailContent);
  }
}

export default new EmailService();
