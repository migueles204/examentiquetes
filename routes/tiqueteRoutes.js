import Router from "express"
const TiqueteRoutes = Router()

import { getTiquete, postTiquete, putTiquete, deleteTiquete, getTiqueteById } from '../controllers/tiqueteController.js'
//haz la ruta del put

TiqueteRoutes.get('/', getTiquete)
TiqueteRoutes.get('/:id', getTiqueteById)
TiqueteRoutes.post('/', postTiquete)
TiqueteRoutes.put('/:id', putTiquete)
TiqueteRoutes.delete('/:id',deleteTiquete)

export default TiqueteRoutes