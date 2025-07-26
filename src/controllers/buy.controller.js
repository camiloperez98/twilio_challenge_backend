import { sendWhatsAppMessage } from "../services/whatsappService.js";
import { buildMessage } from "../utils/messageBuilder.js";
import { products } from "../data/products.js";

export const sendBuyRequest = async (req, res) => {
    try {
        const { productId, phone } = req.body;
        const product = products.find(p => p.id === productId);
        if (!product) res.status(404).json({ message: "Producto no encontrado" });

        const message = buildMessage(product);
        await sendWhatsAppMessage(phone, message, product.imagenUrl);
        res.status(200).json({ message: "Solicitud de compra enviada exitosamente" });

    } catch (error) {
        res.status(500).json({ error: "Error al enviar la solicitud de compra" });
        console.error("Error al enviar la solicitud de compra:", error);
    }
}

