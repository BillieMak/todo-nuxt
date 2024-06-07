import { promises as fs } from 'fs';
import path from "path";


export default defineEventHandler(async (event) => {
  const imagePath = path.join(process.cwd(), "/public/bot.png");

  try {
    const imageBuffer = await fs.readFile(imagePath);

    // Establecer el tipo de contenido a 'image/jgpg or png'
    event.node.res.setHeader("Content-Type", "image/jpeg");

    return imageBuffer;
  } catch (error) {
    // Manejo de errores
    event.node.res.statusCode = 500;
    return { errorMessage: "Error al leer la imagen" , error};
  }
});
