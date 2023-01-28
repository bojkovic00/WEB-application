import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Preduzeca=new Schema({
odgLice:{type: "string"},
korIme:{type: "string"},
lozinka:{type: "string"},
telefon:{type: "number"},
mail:{type: "string"},
naziv:{type: "string"},
adresa:{type: "string"},
pib:{type: "string"},
mbroj:{type: "number"},

img:{type: "string"},

prihvacen:{type: "string"},

kategorija:{type: "string"},

sifra:{type:Array},
pdv:{type:"number"},
racuni:{type:Array},
magacini:{type:Array},
kase:{type:Array},
narucioci:{type:Array},
proizvodi:{type:Array},
naruceno:{type:Array},
zatvoreno:{type:Array},
pazari:{type:Array},
odeljenja:{type:Array},

pro:{type:Array},


prvo:{type:"number"}

})

export default mongoose.model('PredModel',Preduzeca,'preduzeca')