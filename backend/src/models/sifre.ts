import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Sifre = new Schema({
    sifra:{ type:"number"},
    naziv:{ type: "string" }
})

export default mongoose.model('SifreModel', Sifre, 'sifrarnik')