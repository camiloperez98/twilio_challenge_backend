export const buildMessage = (product) => {
  return `PRODUCTO SOLICITADO \n
    Nombre: ${product.name}\n
    Precio: ${product.price}\n
    Descripción: ${product.description}\n
    ¿Desea continuar con la compra?\n
    Responda con "Sí" o "No"`;
};
