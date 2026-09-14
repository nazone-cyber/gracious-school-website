import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);
const allowedOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5500";
const formTypes = new Set(["application", "enquiry", "contact", "newsletter"]);
const textFields = ["name", "studentName", "parentName", "email", "phone", "dateOfBirth", "classChoice", "topic", "message"];

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "nazonenyamutora@gmail.com",
    pass: process.env.EMAIL_PASSWORD || "",
  },
});

const SCHOOL_EMAIL = process.env.SCHOOL_EMAIL || "nazonenyamutora@gmail.com";
const SCHOOL_PHONE = process.env.SCHOOL_PHONE || "0889447944";

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: allowedOrigin, methods: ["GET", "POST"], allowedHeaders: ["Content-Type"] }));
app.use(express.json({ limit: "20kb" }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 60, standardHeaders: "draft-7", legacyHeaders: false }));

app.get("/api/health", (_request, response) => response.json({ status: "ok" }));

// Send email notification
async function sendEmailNotification(type, data) {
  try {
    const subject = getEmailSubject(type);
    const htmlContent = generateEmailContent(type, data);
    
    // Email to school
    await transporter.sendMail({
      from: SCHOOL_EMAIL,
      to: SCHOOL_EMAIL,
      subject: `New ${subject} from Gracious PVT School`,
      html: htmlContent,
    });

    // Reply email to sender
    if (data.email) {
      await transporter.sendMail({
        from: SCHOOL_EMAIL,
        to: data.email,
        subject: `We received your ${type === "application" ? "application" : "message"}`,
        html: generateReplyEmail(type, data),
      });
    }

    console.log(`Email sent for ${type} form`);
  } catch (error) {
    console.error("Email error:", error.message);
  }
}

function getEmailSubject(type) {
  const subjects = {
    application: "Student Application",
    enquiry: "General Enquiry",
    contact: "Contact Message",
    newsletter: "Newsletter Subscription",
  };
  return subjects[type] || "Form Submission";
}

function generateEmailContent(type, data) {
  const timestamp = new Date().toLocaleString();
  let content = `<h2>New ${type.charAt(0).toUpperCase() + type.slice(1)} Received</h2>`;
  content += `<p><strong>Received at:</strong> ${timestamp}</p>`;
  content += "<hr>";

  Object.entries(data).forEach(([key, value]) => {
    if (value && key !== "consent") {
      const label = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
      content += `<p><strong>${label}:</strong> ${value}</p>`;
    }
  });

  content += `<hr><p><strong>Contact school directly:</strong></p>`;
  content += `<p>Email: ${SCHOOL_EMAIL}</p>`;
  content += `<p>Phone: ${SCHOOL_PHONE}</p>`;

  return content;
}

function generateReplyEmail(type, data) {
  const messages = {
    application:
      "Thank you for submitting your student application! We will review your information and contact you within 2-3 business days.",
    enquiry:
      "Thank you for your enquiry! Our team will respond to your question as soon as possible.",
    contact:
      "Thank you for contacting us. The school office will get back to you shortly.",
    newsletter:
      "Welcome! You are now subscribed to our school news and updates.",
  };

  return `
    <h3>Dear ${data.name || data.parentName || "Valued Parent"},</h3>
    <p>${messages[type]}</p>
    <p>If you have any urgent matters, please call us at <strong>${SCHOOL_PHONE}</strong>.</p>
    <p>Best regards,<br>Gracious PVT School Team</p>
  `;
}

app.post("/api/forms/:type", async (request, response) => {
  const { type } = request.params;
  if (!formTypes.has(type))
    return response.status(404).json({ message: "Form not found." });

  const body =
    request.body && typeof request.body === "object" ? request.body : {};
  const cleanData = Object.fromEntries(
    textFields.map((field) => [
      field,
      typeof body[field] === "string" ? body[field].trim().slice(0, 1000) : "",
    ])
  );

  if (type === "newsletter" && !isEmail(cleanData.email))
    return response
      .status(400)
      .json({ message: "Please enter a valid email address." });
  if (
    type !== "newsletter" &&
    (!cleanData.email || !isEmail(cleanData.email))
  )
    return response
      .status(400)
      .json({ message: "Please provide a valid email address." });
  if (
    ["enquiry", "contact"].includes(type) &&
    !cleanData.message
  )
    return response
      .status(400)
      .json({ message: "Please provide a message." });
  if (
    type === "application" &&
    (!cleanData.studentName ||
      !cleanData.parentName ||
      !cleanData.classChoice ||
      !cleanData.phone ||
      body.consent !== "on")
  )
    return response.status(400).json({
      message:
        "Please complete the required application fields and consent.",
    });
  if (
    type === "enquiry" &&
    (!cleanData.name || !cleanData.topic)
  )
    return response
      .status(400)
      .json({ message: "Please complete the required enquiry fields." });
  if (type === "contact" && !cleanData.name)
    return response
      .status(400)
      .json({ message: "Please provide your name." });

  // Log submission
  console.log(
    JSON.stringify({
      type,
      receivedAt: new Date().toISOString(),
      data: cleanData,
    })
  );

  // Send email notification
  await sendEmailNotification(type, cleanData);

  return response.status(201).json({
    message:
      type === "newsletter"
        ? "You are subscribed to school news."
        : "Thank you. The school office will be in touch soon.",
  });
});

function isEmail(value) {
  return (
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) &&
    value.length <= 254
  );
}

app.use((_request, response) =>
  response.status(404).json({ message: "Not found." })
);

app.listen(port, () =>
  console.log(
    `Gracious backend listening on http://localhost:${port}`
  )
);
