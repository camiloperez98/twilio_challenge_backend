import {registerUserService, loginUserService} from "../services/authServices.js";

export const registerUser = async (req, res) => {
  try {
    const { message } = await registerUserService(req.body);
    res
      .status(201)
      .json({
        message: "Usuario registrado exitosamente",
        registerMessage: message,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al registrar el usuario", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { message } = await loginUserService(req.body);
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      loginMessage: message,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al iniciar sesión",
      error: error.message,
    });
  }
};
