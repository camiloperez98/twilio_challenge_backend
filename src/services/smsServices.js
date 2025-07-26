import { clientTwilio } from "../config/twilio.js";

export const sendSms = async (to, body) => {
  try {
    const from = process.env.TWILIO_PHONE_NUMBER;
    if (!from)
      throw new Error(
        "Número de teléfono de Twilio no definido en el archivo .env"
      );

    const message = await clientTwilio.messages.create({
      body,
      from,
      to,
    });

    console.log(`Mensaje enviado a ${to}: ${message.sid}`);
    return message;
  } catch (error) {
    console.error(`Error al enviar SMS a ${to}:`, error.message);
    throw error;
  }
};


