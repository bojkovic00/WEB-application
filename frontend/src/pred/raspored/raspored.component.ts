import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preduzece } from 'src/app/model/preduzece';
import { Roba } from 'src/app/model/roba';
import { PreduzecaService } from 'src/app/preduzeca.service';

@Component({
  selector: 'app-raspored',
  templateUrl: './raspored.component.html',
  styleUrls: ['./raspored.component.css']
})
export class RasporedComponent implements OnInit {

  constructor(private router: Router, private preduzecaService: PreduzecaService) { }



  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
    console.log(this.korisnik.korIme)
    this.preduzecaService.pretraziKorIme(this.korisnik.korIme).subscribe((data: Preduzece) => {

      this.korisnik = data;
      this.svaRoba = data.proizvodi;





      for (var i = 0; i < 7; i++) {
        if (this.svaRoba[i + (this.br - 1) * 7]) { this.robaStr[i] = this.svaRoba[i + (this.br - 1) * 7] } else { this.robaStr[i] = null }

      }
      this.brojevi = []
      for (var i = 0; i < this.svaRoba.length / 7 + ((this.svaRoba.length % 7 == 0) ? 1 : 0); i++) {
        this.brojevi.push(i + 1)

      }

    })


  }

  korisnik: Preduzece;

  svaRoba: Roba[] = [];
  robaStr: Roba[] = []
  brojevi: number[] = []

  kategorija: string;
  potkategorija: string;

  prikazi = false;
  hide() {
    this.prikazi = false;
  }

  dodeliArtikl() { this.prikazi = true }
  message: string;
  promeniKategoriju(pro) {

    if (pro.kkategorija != "") {
      console.log(pro.kkategorija)
      this.message = "Kategorija je već dodeljena"
    }
    else {
      this.message = "";
      pro.kkategorija = this.kategorija;
      pro.potkategorija = this.potkategorija;
      // console.log(this.username, naziv,this.kategorija,this.potkategorija)

      this.preduzecaService.izmeniProizvod(this.korisnik.korIme, this.svaRoba).subscribe(
        resp => {
          // alert(resp['message'])

        }


      )
    }




  }




  br = 1;

  promenaBr(br) {
    this.br = br;
    console.log(this.br)
    for (var i = 0; i < 7; i++) {
      if (this.svaRoba[i + (this.br - 1) * 7]) { this.robaStr[i] = this.svaRoba[i + (this.br - 1) * 7] } else { this.robaStr[i] = null }

    }

    //this.ngOnInit();
  }

  preth() {
    if (this.br != 1) { this.br--; }
    this.promenaBr(this.br);
  }

  next() {
    if (this.br < this.brojevi.length) { this.br++; }
    this.promenaBr(this.br);
  }



  svi: Roba[];
  filter: string;
  filtriraj() {

    if (this.filter == "") {

      this.preduzecaService.pretraziKorIme(this.korisnik.korIme).subscribe((data: Preduzece) => {

        this.korisnik = data;
        this.svaRoba = data.proizvodi;
  
  
  
  
  
        for (var i = 0; i < 7; i++) {
          if (this.svaRoba[i + (this.br - 1) * 7]) { this.robaStr[i] = this.svaRoba[i + (this.br - 1) * 7] } else { this.robaStr[i] = null }
  
        }
        this.brojevi = []
        for (var i = 0; i < this.svaRoba.length / 7 + ((this.svaRoba.length % 7 == 0) ? 1 : 0); i++) {
          this.brojevi.push(i + 1)
  
        }
        return;
      })
 
    }

    this.svi = []

    for (var article of this.svaRoba) {

      var article_name = article.naziv.toLowerCase();
      if (article_name.indexOf(this.filter.toLowerCase()) !== -1) {
        this.svi.push(article);
      }
    }

    this.svaRoba = this.svi;


    for (var i = 0; i < 7; i++) {
      if (this.svaRoba[i + (this.br - 1) * 7]) { this.robaStr[i] = this.svaRoba[i + (this.br - 1) * 7] } else { this.robaStr[i] = null }

    }
    this.brojevi = []
    for (var i = 0; i < this.svaRoba.length / 7 + ((this.svaRoba.length % 7 == 0) ? 1 : 0); i++) {
      this.brojevi.push(i + 1)

    }

  }


}
