import { sendWhatsAppMessage } from "../services/whatsappService.js";
import { buildMessage } from "../utils/messageBuilder.js";
import { products } from "../data/products.js";

export const sendBuyRequest = async (req, res) => {
  try {
    const { productId, phone } = req.body;

    // Validación básica
    if (!productId)
      return res.status(400).json({ message: "ID del producto es requerido" });

    if (!phone)
      return res.status(400).json({ message: "Número de teléfono es requerido" });

    // Buscar producto
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Construir y enviar mensaje
    const message = buildMessage(product);
    await sendWhatsAppMessage(phone, message, product.imagenUrl);

    // Respuesta exitosa
    res
      .status(200)
      .json({ message: "Solicitud de compra enviada exitosamente" });
  } catch (error) {
    console.error("Error al enviar la solicitud de compra:", error);
    res.status(500).json({ error: "Error al enviar la solicitud de compra" });
  }
};
