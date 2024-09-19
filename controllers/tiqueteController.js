// controllers/cuentaController.js
import Tiquete from '../models/tiquete.js'; // Importar el modelo de Cuenta

// Obtener todas las cuentas
export async function getTiquete(req, res) {
    try {
        const tiquetes = await Tiquete.find(); // Buscar todas las tiquetes en la base de datos
        res.json(tiquetes); // Enviar las cuentas como respuesta en formato JSON
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los tiquetes' }); // Manejo de errores
    }
}
//buscar un solo tiquete por id

export async function getTiqueteById(req, res) {
    const { id } = req.params;

    try {
        const tiquete = await Tiquete.findById(id);
        if (!tiquete) {
            return res.status(404).json({ message: 'Tiquete no encontrado' });
        }
        
        res.json(tiquete);
    } catch (error) {
        console.error('Error al obtener el tiquete:', error);
        res.status(500).json({ message: 'Problemas al obtener el tiquete', error });
    }
}

// Crear una nueva cuenta
export async function postTiquete(req, res) {
    const body = req.body; // Obtener los datos del cuerpo de la solicitud

    try {
        const tiquete = new Tiquete({
            ...body,
        });

        // Guardar la nueva cuenta en la base de datos
        await tiquete.save(); 

        res.status(201).json({ message: 'Tiquete creado exitosamente' }); // Respuesta de éxito
    } catch (error) {
        console.error('Error al crear el tiquete:', error);
        res.status(500).json({ message: 'Problemas al crear el tiquete', error }); // Manejo de errores
    }
}
//crea el put para el tiquete

export async function putTiquete(req, res) {
    const { id } = req.params;
    const body = req.body;
    
    try {
        const tiquete = await Tiquete.findByIdAndUpdate(id, body, { new: true });
        if (!tiquete) {
            return res.status(404).json({ message: 'Tiquete no encontrado' });
        }
        
        res.json(tiquete);
    } catch (error) {
        console.error('Error al actualizar el tiquete:', error);
        res.status(500).json({ message: 'Problemas al actualizar el tiquete', error });
    }
}


// Eliminar una cuenta
export async function deleteTiquete(req, res) {
    const { id } = req.params;
    
    try {
        const tiquete = await Tiquete.findById(id);
        if (!tiquete) {
            return res.status(404).json({ message: 'tiquete no encontrado' });
        }
        await Tiquete.findByIdAndDelete(id);
        
        res.json({ message: 'tiquete eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el tiquete', error });
    }
}