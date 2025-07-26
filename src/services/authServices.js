import User from "../models/user.js";
import { sendSms } from "./smsServices.js";
import { sendWhatsAppMessage } from "./whatsappService.js";
import { getCurrentDate } from "../utils/dateUtils.js";
import {checkVerificationService} from "./verifyService.js";
import {codeVerification} from "../controllers/verify.Controller.js";
import bcrypt from "bcrypt";
import config from "../config/config.js";
import jwt from "jsonwebtoken";


export const registerUserService = async (userData) => {
 const { name, email, phone, pin } = userData;
 
  const fullPhoneNumber = "+57" + phone;
  const phoneNumberWpp = "whatsapp:" + fullPhoneNumber;

//  const result = await checkVerificationService(phone, code);
// const result = await codeVerification(phone, code);
//  if (result.status !== "approved") throw new Error("Código de verificación incorrecto o expirado");

  const existingUser = await User.findOne({ where: { phone } });
  if (existingUser) throw new Error("El número de teléfono ya está registrado");

  const hashedPin = await bcrypt.hash(pin, 10);
  const newUser = await User.create({ name, email, phone, pin: hashedPin, isVerified: true });
  const token = jwt.sign({ id: newUser.id }, config.JWT_SECRET, { expiresIn: "1h" });
  const welcomeMessage = `Hola ${name}, te has registrado exitosamente!.`;
  await sendSms(fullPhoneNumber, welcomeMessage);

  return { token };
};


export const loginUserService = async (userData) => {
    const { phone, pin } = userData;

    const fullPhoneNumber = "+57" + phone;
    const phoneNumberWpp = "whatsapp:" + fullPhoneNumber;

    const user = await User.findOne({ where: { phone } });

    if (!user) throw new Error("Usuario no encontrado");

    const isPinValid = await bcrypt.compare(pin, user.pin);

    if (!isPinValid) throw new Error("Pin incorrecto");

    const loginMessage = `Hola ${user.name}, has iniciado sesión!. Fecha y hora: ${getCurrentDate()}`;
    const token = jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: "1h" });

     // await sendSms(fullPhoneNumber, loginMessage);
    await sendWhatsAppMessage(phoneNumberWpp, loginMessage);

    return {message: loginMessage, token};
};