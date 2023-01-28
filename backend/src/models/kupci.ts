import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Kupci = new Schema({
    korime: { type: "string" },
    lozinka: { type: "string" },
    ime: { type: "string" },
    prezime: { type: "string" },
    telefon: { type: "number" },
    brojlk: { type: "number" }
})

export default mongoose.model('KupciModel', Kupci, 'kupci')