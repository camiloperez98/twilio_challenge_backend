import { products } from "../data/products.js";

export  const getProducts = (req, res) => {
    try {
        res.status(200).json( products);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" });
        console.error("Error al obtener los productos:", error);
    }
};