import Tiquete from '../models/tiquete.js';

// Obtener todos los tiquetes
export async function getTiquete(req, res) {
    try {
        const tiquetes = await Tiquete.find();
        res.json(tiquetes);
    } catch (error) {
        console.error('Error al obtener los tiquetes:', error);
        res.status(500).json({ message: 'Error al obtener los tiquetes' });
    }
}

// Buscar un solo tiquete por ID
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
        res.status(500).json({ message: 'Problemas al obtener el tiquete' });
    }
}

// Crear un nuevo tiquete
export async function postTiquete(req, res) {
    const{valor}=req.body;
    const body = req.body;

    try {
        if(valor<0){
            return res.status(400).json({ message: 'El valor del tiquete debe ser un número positivo o mayor a cero' });
        }
        const tiquete = new Tiquete(body);
        await tiquete.save();
        res.status(201).json({ message: 'Tiquete creado exitosamente', tiquete });
    } catch (error) {
        console.error('Error al crear el tiquete:', error);
        res.status(500).json({ message: 'Problemas al crear el tiquete' });
    }
}

// Actualizar un tiquete
export async function putTiquete(req, res) {
    const { id } = req.params;
    const{valor}=req.body;
    const body = req.body;

    try {
        const tiquete = await Tiquete.findByIdAndUpdate(id, body, { new: true });
        if (!tiquete) {
            return res.status(404).json({ message: 'Tiquete no encontrado' });
        }
        if(body.valor<0){
            return res.status(400).json({ message: 'El valor del tiquete debe ser un número positivo o mayor a cero' });
        }
        res.json({ message: 'Tiquete actualizado exitosamente', tiquete });
    } catch (error) {
        console.error('Error al actualizar el tiquete:', error);
        res.status(500).json({ message: 'Problemas al actualizar el tiquete' });
    }
}

// Eliminar un tiquete
export async function deleteTiquete(req, res) {
    const { id } = req.params;

    try {
        const tiquete = await Tiquete.findById(id);
        if (!tiquete) {
            return res.status(404).json({ message: 'Tiquete no encontrado' });
        }
        await Tiquete.findByIdAndDelete(id);
        res.json({ message: 'Tiquete eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el tiquete:', error);
        res.status(500).json({ message: 'Error al eliminar el tiquete' });
    }
}
export async function getTiqueteByOrigen(req, res) {
    const { origen } = req.params;

    try {
        const tiquetes = await Tiquete.find({ origen });
        if (tiquetes.length === 0) {
            return res.status(404).json({ message: 'No se encontraron tiquetes para ese origen' });
        }

        res.json(tiquetes);
    } catch (error) {
        console.error('Error al obtener los tiquetes por origen:', error);
        res.status(500).json({ message: 'Problemas al obtener los tiquetes por origen', error });
    }
}
//consultar la cantidad de tiquetes 

    export async function getTiquetesCount(req, res) {
    try {
        const tiquetesCount = await Tiquete.countDocuments();
        res.json({ tiquetesCount });
    } catch (error) {
        console.error('Error al obtener la cantidad de tiquetes:', error);
        res.status(500).json({ message: 'Error al obtener la cantidad de tiquetes' });
    }
}
//calcular promedio del valor de los tiquetes

    export async function getTiquetesPromedio(req, res) {
    try {
        const tiquetesPromedio = await Tiquete.aggregate([
            { $group: { _id: null, average: { $avg: '$valor' } } }
        ]);
        res.json(tiquetesPromedio);
    } catch (error) {
        console.error('Error al obtener el promedio del valor de los tiquetes:', error);
        res.status(500).json({ message: 'Error al obtener el promedio del valor de los tiquetes' });
    }
}