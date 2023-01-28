import { MagaciniStanje } from "./magaciniStanje";

export class Roba{

sifra:number;
naziv:string;
jedMere:string;
stopa:number;
proizvodjac:string;

zemljaPorekla:string;
straniNaziv:string;
barkod:string;
nazivProizvodjaca:string;
carinskaTarifa:number;
ekotaksa:number;
akcize:number;
minZalihe:number;
maxZalihe:number;
opis:string;
deklaracija:string;

magacini:Array<MagaciniStanje>;

kkategorija:string;
potkategorija:string;

narucenaKolicina:number;
porez:number;


img: string | ArrayBuffer;
}