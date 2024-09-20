import Router from "express";
const TiqueteRoutes = Router();
import { getTiquete, postTiquete, putTiquete, deleteTiquete, getTiqueteById, getTiqueteByOrigen, getTiquetesCount, getTiquetesPromedio } from '../controllers/tiqueteController.js';

TiqueteRoutes.get('/', getTiquete);
TiqueteRoutes.get('/:id', getTiqueteById);
TiqueteRoutes.get('/origen/:origen', getTiqueteByOrigen); // Asegúrate de que esta línea esté presente
TiqueteRoutes.get('/count/count', getTiquetesCount); // Agregue esta nueva ruta para obtener el número de tiquetes

TiqueteRoutes.get('/promedio/promedio', getTiquetesPromedio); // Agregue esta nueva ruta para obtener el promedio de duración de tiquetes
TiqueteRoutes.post('/', postTiquete);
TiqueteRoutes.put('/:id', putTiquete);
TiqueteRoutes.delete('/:id', deleteTiquete);

export default TiqueteRoutes;
