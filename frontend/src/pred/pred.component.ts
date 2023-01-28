import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preduzece } from '../model/preduzece';
import { PreduzecaService } from '../preduzeca.service';

@Component({
  selector: 'app-pred',
  templateUrl: './pred.component.html',
  styleUrls: ['./pred.component.css', '../login/login.component.css']
})
export class PredComponent implements OnInit {


  constructor(private router: Router, private preduzecaService: PreduzecaService) { }


  ngOnInit(): void {

    this.preduzecaService.pretraziKorIme(this.username).subscribe((data: Preduzece) => {

      this.korisnik = data;
     


    })


  }


  korisnik: Preduzece;
  username = "pred4"

}
