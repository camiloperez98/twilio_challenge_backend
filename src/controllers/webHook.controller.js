import twilio from "twilio"; //
const MessagingResponse = twilio.twiml.MessagingResponse; // Importar la clase MessagingResponse de Twilio

// Controlador para manejar los mensajes entrantes de WhatsApp
export const handleIcomingMessage = async (req, res) => {
  try {
    const { Body, From } = req.body;
    console.log(`Mensaje recibido de ${From}: ${Body}`);

    const response = Body.toLowerCase().trim();
    const twiml = new MessagingResponse();

    if (response === "sí" || response === "si") {
      console.log(`Usuario ${From} ha confirmado la compra.`);
      twiml.message("✅ ¡Gracias por confirmar tu compra!. Tu solicitud ha sido procesada.");

    } else if (response === "no") {
      console.log(`Usuario ${From} ha cancelado la compra.`);
      twiml.message("❌ Has cancelado la compra.");
      
    } else {
      console.log(`El usuario ${From} ha enviado una respuesta no válida`);
      twiml.message("⚠️ Por favor, responde 'sí' para confirmar o 'no' para cancelar la compra.");
    }

    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  } catch (error) {
    console.error("Error al manejar el mensaje entrante:", error);
    res.status(500).send("Error al manejar el mensaje entrante");
  }
};
