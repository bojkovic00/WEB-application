import { Dpazar } from "./dPazar";
import { Kasa } from "./kasa";
import { Magacin } from "./magacin";
import { Narucilac } from "./narucilac";
import { Racun } from "./racun";
import { racunIzdat } from "./racunIzdat";
import { Roba } from "./roba";
import { Sifra } from "./sifra";
import { odeljenjeBaza } from "./odeljenjeBaza";
import { Pro } from "./pro";

export class Preduzece {

    odgLice: string;
    korIme: string;
    lozinka: string;
    telefon: number;
    mail: string;
    naziv: string;
    adresa: string;
    pib: string;
    mbroj: number;

    img: string;

    prihvacen: string;
    kategorija: string;
    sifra: Array<Sifra>;
    pdv: number;
    racuni: Array<Racun>;
    magacini: Array<Magacin>;
    kase: Array<Kasa>;
    narucioci: Array<Narucilac>;
    proizvodi: Array<Roba>;
    naruceno: Array<racunIzdat>;
    zatvoreno: Array<racunIzdat>;
    pazari: Array<Dpazar>;
    odeljenja: Array<odeljenjeBaza>;


    pro:Array<Pro>;

    prvo:number;
}