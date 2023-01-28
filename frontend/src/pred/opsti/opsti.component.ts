import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preduzece } from 'src/app/model/preduzece';
import { PreduzecaService } from 'src/app/preduzeca.service';

@Component({
  selector: 'app-opsti',
  templateUrl: './opsti.component.html',
  styleUrls: ['./opsti.component.css', '../pred.component.css']
})
export class OpstiComponent implements OnInit {

  constructor(private router: Router, private preduzecaService: PreduzecaService) { }



  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
    console.log(this.korisnik.korIme)
    this.preduzecaService.pretraziKorIme(this.korisnik.korIme).subscribe((data: Preduzece) => {

      this.korisnik = data;


    })


  }

  prikazPod = 1;
  opstiPod() { this.prikazPod = 1 }
  ziroRac() { this.prikazPod = 2 }
  magKase() { this.prikazPod = 3 }

  korisnik: Preduzece;



  potvrdaPromOpste() {

    this.preduzecaService.potvrdaPromOpste(this.korisnik.korIme, this.korisnik.odgLice, this.korisnik.telefon, this.korisnik.mail).subscribe(resp => {
      // alert(resp['message'])

      this.ngOnInit()
    })
  }

  potvrdaPromRacuna() {

    this.preduzecaService.potvrdaPromRacuna(this.korisnik.korIme, this.korisnik.racuni).subscribe(resp => {
      //alert(resp['message'])

      this.ngOnInit()
    })
  }


  potvrdaPromMagacina() {

    this.preduzecaService.potvrdaPromMagacina(this.korisnik.korIme, this.korisnik.magacini).subscribe(resp => {
      // alert(resp['message'])

      this.ngOnInit()
    })
  }

  potvrdaPromKasa() {

    this.preduzecaService.potvrdaPromKasa(this.korisnik.korIme, this.korisnik.kase).subscribe(resp => {
      // alert(resp['message'])

      this.ngOnInit()
    })
  }









}
