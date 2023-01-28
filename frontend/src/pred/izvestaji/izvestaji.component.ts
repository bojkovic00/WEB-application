import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dpazar } from 'src/app/model/dPazar';
import { Preduzece } from 'src/app/model/preduzece';
import { racunIzdat } from 'src/app/model/racunIzdat';
import { PreduzecaService } from 'src/app/preduzeca.service';

@Component({
  selector: 'app-izvestaji',
  templateUrl: './izvestaji.component.html',
  styleUrls: ['./izvestaji.component.css']
})
export class IzvestajiComponent implements OnInit {

  constructor(private router: Router, private preduzecaService: PreduzecaService) { }



  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
    console.log(this.korisnik.korIme)
    this.preduzecaService.pretraziKorIme(this.korisnik.korIme).subscribe((data: Preduzece) => {

      this.korisnik = data;
      this.zatvoreniRacuni = data.zatvoreno;
      this.izdvojPoDanima();
    })


  }

  korisnik: Preduzece

  zatvoreniRacuni: racunIzdat[] = []
  pazari: Dpazar[] = []

  dani: string[] = []
  izdvojPoDanima() {
    this.dani = [];
    this.pazari = [];
    this.zatvoreniRacuni.forEach(d1 => {
      console.log(d1.datum.toString().substring(0, 10));

      if (this.dani.includes(d1.datum.toString().substring(0, 10))) {


      } else {
        console.log(d1.datum.toString().substring(0, 10))
        this.dani.push(d1.datum.toString().substring(0, 10));
      }
    })


    this.dani.forEach(d => {
      var vred = 0;
      var porez = 0;
      this.zatvoreniRacuni.forEach(d1 => {
        if (d1.datum.toString().substring(0, 10) == d) {
          console.log(Number(d1.iznos) + " iznos")
          vred += Number(d1.iznos);
          porez += Number(d1.porez);
        }
      })
      this.pazari.push({ dan: d, vrednost: vred, porez: porez })
      //UBACI PAZAR U BAZU

      this.preduzecaService.dodajPazar(this.korisnik.korIme, this.pazari).subscribe(data => {

        console.log("izmenjeno")
      })


    })

  }


}
