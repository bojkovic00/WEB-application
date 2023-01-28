import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Narucilac } from 'src/app/model/narucilac';
import { odeljenjeBaza } from 'src/app/model/odeljenjeBaza';
import { Preduzece } from 'src/app/model/preduzece';
import { racunIzdat } from 'src/app/model/racunIzdat';
import { PreduzecaService } from 'src/app/preduzeca.service';

@Component({
  selector: 'app-racuni',
  templateUrl: './racuni.component.html',
  styleUrls: ['./racuni.component.css']
})
export class RacuniComponent implements OnInit {

  constructor(private router: Router, private preduzecaService: PreduzecaService) { }



  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
    console.log(this.korisnik.korIme)
    this.preduzecaService.pretraziKorIme(this.korisnik.korIme).subscribe((data: Preduzece) => {

      this.korisnik = data;
      this.odeljenjaBaza = data.odeljenja;

    })


  }

  odeljenjaBaza: odeljenjeBaza[];



  korisnik: Preduzece;


  tipPlacanja: number;
  vrednostDao: number;
  brojLicne: number;
  kusur: number;

  //cek
  imePrezime: string;

  //kartica
  slipRacun: number

  //virman
  naruciociNiz: Narucilac[];


  narucenoKor: racunIzdat[] = [];
  zatvoreniRacuni: racunIzdat[] = []
  ///ZAR NIJE NARUCILAC KLASA
  izabraniN: Preduzece;


  zatvoriRacun(id) {
    this.preduzecaService.pretraziKorIme(this.korisnik.korIme).subscribe((data: Preduzece) => {
      this.korisnik = data;
      this.narucenoKor = this.korisnik.naruceno;


      this.narucenoKor.forEach(data => {
        console.log(data.idStola + " idstola");
        if (data.idStola == id) {

          data.datum = new Date();

          if (this.tipPlacanja == 1) { data.nacinPlacanja = "Gotovina" }
          else if (this.tipPlacanja == 2) { data.nacinPlacanja = "Ček" }
          else if (this.tipPlacanja == 3) { data.nacinPlacanja = "Katrica" }
          else if (this.tipPlacanja == 4) { data.nacinPlacanja = "Virman" }

          data.otvoren = false;

          data.kupacLicna = this.brojLicne;
          this.kusur = data.iznos - this.vrednostDao;

          this.preduzecaService.dodajStavkuRacuna(this.korisnik.korIme, this.narucenoKor).subscribe(
            resp => {
              console.log("azur")
              //vrati narucenu kol na 0

            }
          )


          this.odeljenjaBaza.forEach(o => {
            o.stolovi.forEach(sto => {
              if (sto.id == id) {
                sto.zauzet = 0;

                this.preduzecaService.izmeniOdeljenja(this.korisnik.korIme, this.odeljenjaBaza).subscribe(data => {
                });

              }

            })

          })



        }

      })


      console.log(this.kusur);





    })
  }






  ocistiSto(id) {

    this.preduzecaService.pretraziKorIme(this.korisnik.korIme).subscribe((data: Preduzece) => {
      this.korisnik = data;
      this.narucenoKor = this.korisnik.naruceno;

      this.narucenoKor.forEach((data, index) => {

        if (data.idStola == id) {

          //zatvara racun// prebacuje iz narucen u zatvoren
          this.preduzecaService.dodajStavkuZatvoren(this.korisnik.korIme, data).subscribe(
            resp => {
              console.log("zatvorio racun")

            })

          this.narucenoKor.splice(index, 1);

          this.preduzecaService.dodajStavkuRacuna(this.korisnik.korIme, this.narucenoKor).subscribe(
            resp => {
              console.log("azurirao")
            }
          )
        }

      })




    })
    this.tipPlacanja = 0;

  }


}
