import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Racun = new Schema({
    idStola:{type:"number"},
    proizvod:{type:"Array"},
    porez:{ type:"number"},
    kupacLicna:{ type:"number"},
    otvoren:{type:"boolean"},
    datum:{ type:"Date"}
})

export default mongoose.model('RacunModel', Racun, 'racuni')