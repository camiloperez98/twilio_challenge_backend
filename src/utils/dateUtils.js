export const getCurrentDate = () => {
    return new Date().toLocaleString("es-CO", {
        timeZone: "America/Bogota",
    });
}