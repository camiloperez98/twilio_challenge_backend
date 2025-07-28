import {startVerificationService, checkVerificationService,} from "../services/verifyService.js";
import { phoneTest } from "../config/twilio.js";
import {addVerifiedPhone} from "../utils/verifiedPhone.js";

export const startVerification = async (req, res) => {
  const { phone, channel } = req.body;

  const formatPhone = phoneTest || phone;
  const channelDefault = "sms" || channel;

  try {
    if (!formatPhone)
      return res.status(400).json({
        message: "Ingrese el número el numero de celular",
      });

    const result = await startVerificationService(formatPhone, channelDefault);

    res
      .status(200)
      .json({ message: "Codigo de verificación enviado", sid: result.sid });
  } catch (error) {
    res.status(500).json({
      message: "Error al enviar el código de verificación",
      error: error.message,
    });
  }
};

export const codeVerification = async (req, res) => {

  const { phone, code } = req.body;

  try {
    if (!code)
      return res.status(400).json({
        message:
          "Ingrese el código de verificación enviado a su número de celular",
      });

    console.log("Verificando código para el número:", phone, code);
    const result = await checkVerificationService(phone, code);

    if (result.status === "approved") {
      addVerifiedPhone(phone);
      console.log("Código verificado correctamente para el número:", phone);
      res.status(200).json({ message: "Código verificado correctamente" });
    } else {
      res.status(400).json({ message: "Código incorrecto o expirado" });
    }
    
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al verificar el código", error: error.message });
  }
};
