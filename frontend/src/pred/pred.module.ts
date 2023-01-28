import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PredRoutingModule } from './pred-routing.module';
import { PredComponent } from './pred.component';
import { OpstiComponent } from './opsti/opsti.component';
import { NaruciociComponent } from './narucioci/narucioci.component';
import { RobeComponent } from './robe/robe.component';
import { RasporedComponent } from './raspored/raspored.component';
import { StoloviComponent } from './stolovi/stolovi.component';
import { RacuniComponent } from './racuni/racuni.component';
import { IzvestajiComponent } from './izvestaji/izvestaji.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PromenaComponent } from './promena/promena.component';


@NgModule({
  declarations: [
    PredComponent,
    OpstiComponent,
    NaruciociComponent,
    RobeComponent,
    RasporedComponent,
    StoloviComponent,
    RacuniComponent,
    IzvestajiComponent,
    PromenaComponent
  ],
  imports: [
    CommonModule,
    PredRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class PredModule { }
