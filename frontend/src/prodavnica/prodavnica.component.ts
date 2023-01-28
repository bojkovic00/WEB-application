import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dpazar } from '../model/dPazar';
import { Kasa } from '../model/kasa';
import { Magacin } from '../model/magacin';
import { MagaciniStanje } from '../model/magaciniStanje';
import { Narucilac } from '../model/narucilac';
import { Odeljenje } from '../model/odeljenje';
import { Preduzece } from '../model/preduzece';
import { Racun } from '../model/racun';
import { racunIzdat } from '../model/racunIzdat';
import { Roba } from '../model/roba';
import { Table } from '../model/sto';
import { PreduzecaService } from '../preduzeca.service';

@Component({
  selector: 'app-prodavnica',
  templateUrl: './prodavnica.component.html',
  styleUrls: ['./prodavnica.component.css', '../login/login.component.css']
})
export class ProdavnicaComponent implements OnInit {

  constructor(private preduzecaService: PreduzecaService, private router: Router) { }
  korisnik: Preduzece
  zatvoreniRacuni: racunIzdat[] = []

  magStanje: MagaciniStanje[] = []

  ngOnInit(): void {
    this.odabranoOdeljenje = 0;
    this.odeljenja.push({ naziv: "restoran", stolovi: [] })
    //////////////////////////////////////////////////
    this.magStanje = []




    ////////////////////////////////////

    this.preduzecaService.pretraziKorIme("pred4").subscribe((data: Preduzece) => {
      this.korisnik = data;

      this.zatvoreniRacuni = this.korisnik.zatvoreno;
      this.izdvojPoDanima();

      this.korisnik.magacini.forEach(m => {

        this.magStanje.push({ magacin: m.naziv, nabavnaCena: null, prodajnaCena: null, lager: null, minKol: null, maxKol: null })

      })

    })





    this.username = "pred4"

    this.preduzecaService.pretraziKorIme(this.username).subscribe(

      (predFromDB: Preduzece) => {
        if (predFromDB != null) {
          this.odgLice = predFromDB.odgLice;
          this.telefon = predFromDB.telefon;
          this.mail = predFromDB.mail;

          this.adresa = predFromDB.adresa;
          this.mbroj = predFromDB.mbroj;
        //  this.pib = predFromDB.pib;

          this.racuni = predFromDB.racuni;
          this.magacini = predFromDB.magacini;
          this.kase = predFromDB.kase;
          this.svaRoba = predFromDB.proizvodi;

        } else {
          //greska
          //this.message = "Korisnik sa datim korisničkim imenom već postoji!";
        }
      }

    )



  }







  ////////////////////////////////////////////////////
  prikaz = 1

  podaciPred() { this.prikaz = 1 }
  narucioci() { this.prikaz = 2 }
  robeiusluge() { this.prikaz = 3 }
  rasporedArtikala() { this.prikaz = 4 }

  /////////////////////////

  username: string;

  odgLice: string;
  telefon: number;
  mail: string;

  adresa: string;
  pib: number;
  mbroj: number;

  racuni: Racun[] = []
  magacini: Magacin[] = []
  kase: Kasa[] = []



  ////////////// ROBA I USLUGE
  svaRoba: Roba[] = [];

  ////////////////////////////////
  rasporedStolova() {

    this.prikaz = 5;

    this.odeljenja[this.odabranoOdeljenje].stolovi.forEach(sto => {

      sto.fja2(sto.path_to_image);

    })

  }

  izdavanjeRacuna() {
    this.prikaz = 6;
  }

  pregledIzvestaja() {
    this.prikaz = 7;
  }

  //raspored stolova////////////////////////////////////////////////////////////////




  odeljenja: Odeljenje[] = []

  odabranoOdeljenje: number;

  /////////////////////////////////////IZDAVANJE RACUNA
 



///////////////////////////////////////////////////////////
  pazari: Dpazar[] = []

  dani: string[] = []
  izdvojPoDanima() {
    this.dani = [];
    this.pazari = [];
    this.zatvoreniRacuni.forEach(d1 => {
      console.log(d1.datum.toString().substring(0, 10));

      if (this.dani.includes(d1.datum.toString().substring(0, 10))) { } else {
        console.log(d1.datum.toString().substring(0, 10))
        this.dani.push(d1.datum.toString().substring(0, 10));
      }
    })


    this.dani.forEach(d => {
      var vred = 0;
      var porez = 0;
      this.zatvoreniRacuni.forEach(d1 => {
        if (d1.datum.toString().substring(0, 10) == d) {

          d1.proizvod.forEach(d2 => {
            //IZMENI
            //  vred += Number(d2.prodajnaCena);
            porez += Number(d2.porez);
          })



        } else { }
      })

      this.pazari.push({ dan: d, vrednost: vred, porez: porez })


    })

  }



}

