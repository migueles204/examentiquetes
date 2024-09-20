import Router from "express";
const TiqueteRoutes = Router();
import { getTiquete, postTiquete, putTiquete, deleteTiquete, getTiqueteById, getTiqueteByOrigen } from '../controllers/tiqueteController.js';

TiqueteRoutes.get('/', getTiquete);
TiqueteRoutes.get('/:id', getTiqueteById);
TiqueteRoutes.get('/origen/:origen', getTiqueteByOrigen); // Asegúrate de que esta línea esté presente
TiqueteRoutes.post('/', postTiquete);
TiqueteRoutes.put('/:id', putTiquete);
TiqueteRoutes.delete('/:id', deleteTiquete);

export default TiqueteRoutes;
