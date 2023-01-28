import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KupciService } from '../kupci.service';
import { Kupac } from '../model/kupac';
import { Preduzece } from '../model/preduzece';
import { racunIzdat } from '../model/racunIzdat';
import { PreduzecaService } from '../preduzeca.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private kupciService: KupciService, private preduzecaService: PreduzecaService, private router: Router) { }

  ngOnInit(): void {
    this.sviRacuniIspis = []

    this.kupciService.dohvSvaPreduzeca().subscribe((data: Preduzece[]) => {

      this.svaPreduzeca = data;

      this.svaPreduzeca.forEach(data => {
        data.zatvoreno.forEach(d => {
          this.sviRacuni.push(d)
        })

      })

      this.sviRacuni.sort((a, b) => a.datum > b.datum ? -1 : 1)

      for (var i = 0; i < 5; i++) {
        if (this.sviRacuni[i] != null) {
          this.sviRacuniIspis.push(this.sviRacuni[i])
        }
      }
    })

  }

  svaPreduzeca: Preduzece[] = []
  sviRacuni: racunIzdat[] = []
  sviRacuniIspis: racunIzdat[] = []

  //////////////////////////////////////
  password: string;
  username: string;
  poruka: string;

  login() {
    console.log("pozvao login fun");
    this.kupciService.login(this.username).subscribe(
      (userFromDB: Kupac) => {
        if (userFromDB != null) {
          if (userFromDB.lozinka == this.password) {
            localStorage.setItem('korisnik', JSON.stringify(userFromDB));
            this.router.navigate(['kupci']);
          }
          else {
            this.poruka = "Pogresna lozinka";
          }
        } else {
          this.preduzecaService.login(this.username).subscribe(
            (predFromDB: Preduzece) => {
              if (predFromDB != null) {
                if (predFromDB.lozinka == this.password) {
                  localStorage.setItem('korisnik', JSON.stringify(predFromDB));

                  console.log(predFromDB)
                  console.log(predFromDB.prihvacen)
                  if(predFromDB.prihvacen ==""){
                    this.poruka = "Preduzeće nije prihvaceno";
                    return;
                  }
                  if (predFromDB.prihvacen == "neaktivan") {
                    this.poruka = "Preduzeće nije aktivno";
                    return;
                  }
                  if (Number(predFromDB.prvo) == 1) {
                    this.router.navigate(['preduzeca']);
                  } else {
                    this.router.navigate(['pred']);
                  }


                }
                else {
                  this.poruka = "Pogresna lozinka";
                }
              } else {
                this.poruka = "Korisnik ne postoji";

              }
            }
          )


        }
      }
    )
  }






























}
