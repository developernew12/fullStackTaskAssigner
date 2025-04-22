import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail", // or your preferred email service like 'Yahoo', 'Outlook'
  auth: {
    user: process.env.EMAIL_USER,     // your email address
    pass: process.env.EMAIL_PASSWORD,     // your email app password
  },
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    const mailOptions = {
      from: `"Task Assigner" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to", to);
  } catch (error) {
    console.error("❌ Failed to send email to", to, error.message);
  }
};

export default sendEmail;
