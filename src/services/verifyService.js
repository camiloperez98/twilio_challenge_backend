// src/services/verifyService.js
import { clientTwilio, verifySid } from "../config/twilio.js";

if (!verifySid) {
  throw new Error("Verify SID no definido en el archivo .env");
}

// Iniciar la verificación
export const startVerificationService = async (phone, channel) => {
  try {

    const verification = await clientTwilio.verify.v2.services(verifySid)
      .verifications
      .create({ to: phone, channel });

    console.log(`Código enviado a ${phone} vía ${channel}`);
    return verification;
  } catch (error) {
    console.error("Error iniciando verificación:", error.message);
    throw error;
  }
};

// Verificar el código recibido por el usuario
export const checkVerificationService = async (phone, code) => {
  try {
    const verificationCheck = await clientTwilio.verify.v2.services(verifySid)
      .verificationChecks
      .create({ to: phone, code });

    console.log(`Verificación de ${phone}: ${verificationCheck.status}`);
    return verificationCheck;
  } catch (error) {
    console.error("Error verificando el código:", error.message);
    throw new Error(error?.message || "Error al verificar el código");
  }
};
