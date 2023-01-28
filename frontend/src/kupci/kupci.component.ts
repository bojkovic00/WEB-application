import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KupciService } from '../kupci.service';
import { Kupac } from '../model/kupac';
import { Preduzece } from '../model/preduzece';
import { Pro } from '../model/pro';
import { racunIzdat } from '../model/racunIzdat';
import { Roba } from '../model/roba';

@Component({
  selector: 'app-kupci',
  templateUrl: './kupci.component.html',
  styleUrls: ['./kupci.component.css', '../login/login.component.css']
})
export class KupciComponent implements OnInit {

  constructor(private kupciService: KupciService, private router: Router) { }




  ngOnInit(): void {

    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
    // console.log(this.korisnik.korime)
    this.kupciService.pretraziKorIme(this.korisnik.korime).subscribe((data: Kupac) => {

      this.korisnik = data;


      this.sviRacuni = []
      this.kupciService.dohvSvaPreduzeca().subscribe((data: Preduzece[]) => {

        this.svaPreduzeca = data;

        data.forEach(d1 => {

          d1.zatvoreno.forEach(d2 => {
            if (d2.kupacLicna == this.korisnik.brojlk) {
              this.sviRacuni.push(d2);
              //DODATI SVI RAC U BAZU KOD KUPCA



            }

          })
        })


        localStorage.setItem('sviRacuni', JSON.stringify(this.sviRacuni));


        data.forEach(d1 => {


          d1.proizvodi.forEach(d2 => {
            this.niz = ""
            var min = 100000000;

            d2.magacini.forEach(d3 => {

              console.log(d3.prodajnaCena + " " + min)
              if (d3.prodajnaCena < Number(min) && d3.prodajnaCena != null) {
                console.log(d3.prodajnaCena + " usao")
                min = d3.prodajnaCena;
                console.log(min);
              }
              if (d3.lager > 0) {
                this.niz += (d3.magacin)
                this.niz += " "
              }


            })
            d1.pro.push({ cena: min, mag: this.niz });

          })





        })






      })
    })





  }


  graf=0;

  niz: string


  svaPreduzeca: Preduzece[] = [];
  sviRacuni: racunIzdat[] = [];

  korisnik: Kupac;



  naziv = "";
  proizvodjac = "";

  svi: Roba[]
  pro: Pro[]

  prikaz1 = 0;
  racun: racunIzdat;


  odaberi(r) {
    this.prikaz1 = 1;
    this.racun = r;

  }


  filtriraj(pred) {
    /* this.svaPreduzeca.forEach(pr => {
        if (pr.korIme == pred.korIme) {
  
  
        }})*/
    this.kupciService.dohvSvaPreduzeca().subscribe((data: Preduzece[]) => {

      this.svaPreduzeca = data;

      this.svaPreduzeca.forEach(pr => {
        if (pr.korIme == pred.korIme) {
          pred.proizvodi = pr.proizvodi;
          pred.pro = [];

          pred.proizvodi.forEach(d2 => {
            this.niz = ""
            var min = 100000000;

            d2.magacini.forEach(d3 => {

              console.log(d3.prodajnaCena + " " + min)
              if (d3.prodajnaCena < Number(min) && d3.prodajnaCena != null) {
                console.log(d3.prodajnaCena + " usao")
                min = d3.prodajnaCena;
                console.log(min);
              }
              if (d3.lager > 0) {
                this.niz += (d3.magacin)
                this.niz += " "
              }


            })

            pred.pro.push({ cena: min, mag: this.niz });

          })
          //  pred.pro=pr.pro;
        }
      })
      //this.ngOnInit()


      this.svi = []
      this.pro = []

      pred.proizvodi.forEach((article, index) => {

        var article_name = article.naziv.toLowerCase();
        if (article.proizvodjac != null) var article_pro = article.proizvodjac.toLowerCase();
        if (article_name.indexOf(this.naziv.toLowerCase()) !== -1) {
          console.log("ejeee")
          if (article_pro == null || article_pro.indexOf(this.proizvodjac.toLowerCase()) !== -1) {
            this.svi.push(article);
            this.pro.push(pred.pro[index])
          }
        }
      })

      // pred.proizvodi = this.svi;
      this.svaPreduzeca.forEach(pr => {
        if (pr.korIme == pred.korIme) {
          pr.proizvodi = []
          pr.proizvodi = this.svi;
          pr.pro = this.pro;
        }
      })


    })







  }

















  prikaz = 1;
  pregledPreduzeca() {
    this.prikaz = 1;
  }

  pregledRacuna() {
    this.prikaz = 2;
  }






}
