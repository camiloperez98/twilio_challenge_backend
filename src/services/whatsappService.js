import { clientTwilio } from "../config/twilio.js";

export const sendWhatsAppMessage = async (to, body, mediaUrl) => {
  try {
    const from = process.env.TWILIO_WHATSAPP_NUMBER;
    if (!from) {
      throw new Error("Número de WhatsApp de Twilio no definido en el archivo .env");
    }

    const messageData = {
      body,
      from,
      to,
    };

    if (mediaUrl) {
      messageData.mediaUrl = [mediaUrl];
    }

    const message = await clientTwilio.messages.create(messageData);

    console.log(`Mensaje de WhatsApp enviado a ${to}: ${message.sid}`);
    return message;
  } catch (error) {
    console.error(`Error al enviar WhatsApp a ${to}:`, error.message);
    throw error;
  }
};