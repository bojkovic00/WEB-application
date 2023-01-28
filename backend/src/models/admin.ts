import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Admin = new Schema({
    korime: { type: "string" },
    lozinka: { type: "string" },
    ime: { type: "string" },
    prezime: { type: "string" },
   
})

export default mongoose.model('AdminModel', Admin, 'admin')