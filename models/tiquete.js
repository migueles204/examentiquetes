import { Schema, model } from 'mongoose';

const tiqueteSchema = new Schema({
  numeroTiquete: {
    type: Number,
    unique: true
  },
  documentoPasajero: {
    type: Number,
    required: true,
  },
  nombrePasajero: {
    type: String,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  impuesto: {
    type: Number,
    required: true,
    default: function() {
      return this.valor * 0.16;
    }
  },
  placaVehiculo: {
    type: String,
    required: true,
  },
  origen: {
    type: String,
    required: true,
  },
  destino: {
    type: String,
    required: true,
  },
});

// Middleware para autoincrementar numeroTiquete
tiqueteSchema.pre('save', async function(next) {
  try {
    const lastTiquete = await this.constructor.findOne().sort({ numeroTiquete: -1 });
    this.numeroTiquete = lastTiquete ? lastTiquete.numeroTiquete + 1 : 1;
    next();
  } catch (err) {
    next(err);
  }
});

const Tiquete = model('Tiquete', tiqueteSchema, 'tiquete');

export default Tiquete;
