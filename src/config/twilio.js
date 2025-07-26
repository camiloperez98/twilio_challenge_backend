import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneTest = process.env.TWILIO_VERIFY_TEST_PHONE;
const verifySid = process.env.TWILIO_VERIFY_SID;
const phoneWhatsApp = process.env.TWILIO_WHATSAPP_NUMBER;

if (!accountSid || !authToken) {
  throw new Error("Crendenciales de twilio no definidas en el archivo .env");
}

export const clientTwilio = twilio(accountSid, authToken);
export { phoneTest, verifySid, phoneWhatsApp };