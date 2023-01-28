
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { racunIzdat } from '../model/racunIzdat';

@Component({
  selector: 'app-grafikon',
  templateUrl: './grafikon.component.html',
  styleUrls: ['./grafikon.component.css']
})
export class GrafikonComponent implements OnInit {

  constructor() { }

  private readonly NAMES = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
  brDana: number
  ngOnInit(): void {

    this.sviRacuni = JSON.parse(localStorage.getItem('sviRacuni'));
    var datum = new Date();
    var mesec = datum.getMonth();
    console.log(mesec);
    var year = datum.getFullYear();
    this.brDana = new Date(year, mesec, 0).getDate();
    for (var i = 0; i < 12; i++) {
this.niz.push(0);
    }

    this.sviRacuni.forEach(element => {
      console.log(element.datum.toString())


  this.niz[Number(element.datum.toString().substring(5,7))-1]+=element.iznos;

    });

    this.dataSource = this.getData();
    this.svg = d3.select('#bar').select('svg');
    this.xScale = d3.scaleBand();


    this.yScale = d3.scaleLinear();
    this.setSVGDimensions();

    this.mainContainer = this.svg.append('g').attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    this.gy = this.mainContainer.append('g').attr('class', 'axis axis--y');
    this.gx = this.mainContainer.append('g').attr('class', 'axis axis--x');
    this.draw();





  }

  sviRacuni: racunIzdat[]=[];
  niz: number[] = []

  dataSource: Item[];

  getData(): Item[] {
    const nbItems = 12;
    const samples = [];
    for (let i = 0; i < nbItems; i++) {

      const val = this.niz[i];
      //const val = 5;
      samples.push({
        name: this.NAMES[i],
        value: val,
        abs: Math.abs(val)
      });
    }
    return samples;
  }

  get height(): number { return parseInt(d3.select('body').style('height'), 10); }
  get width(): number { return parseInt(d3.select('body').style('width'), 10); }
  private margin = { top: 20, right: 20, bottom: 30, left: 40 };
  get barWidth(): number { return this.width - this.margin.left - this.margin.right; }
  get barHeight(): number { return this.height - this.margin.top - this.margin.bottom; }

  gx: any; gy: any; bars: any;

  xAxis: any; xScale: any; yAxis: any; yScale: any;

  svg: any; mainContainer: any;



  private drawBars() {
    this.bars = this.mainContainer.selectAll('.bar')
      .remove().exit()
      .data(this.dataSource).enter().append('rect');

    this.bars
      .attr('x', d => this.xScale(d.name))
      .attr('y', d => this.yScale(d.value))
      .attr('width', Number(this.xScale.bandwidth()))
      .attr('height', d => Math.abs(Number(this.yScale(d.value)) - Number(this.yScale(0))))
      .attr("fill", function (d) {
        if (d.value < 20) {
          return "yellow";
        } else if (d.value < 50) {
          return "orange";
        }
        return "red";
      });
  }

  private drawAxis() {
    this.gy.attr('transform', `translate(0, 0)`).call(this.yAxis);
    this.gx.attr('transform', `translate(0, ${this.yScale(0)})`).call(this.xAxis);
  }

  private setSVGDimensions() {
    this.svg.style('width', this.width).style('height', this.height);
  }

  private setAxisScales() {
    this.xScale = d3.scaleBand();
    this.yScale = d3.scaleLinear();

    this.xScale
      .rangeRound([0, this.barWidth]).padding(.1)
      .domain(this.dataSource.map(d => d.name));
    this.yScale
      .range([this.barHeight, 0])
      .domain([0, Math.max(...this.dataSource.map(x => x.value))]);
    this.xAxis = d3.axisBottom(this.xScale);
    this.yAxis = d3.axisLeft(this.yScale);
  }

  private draw() {
    this.setAxisScales();
    this.drawAxis();
    this.drawBars();
  }



}
export interface Item {
  name: string;
  value: number;
  abs: number;
}