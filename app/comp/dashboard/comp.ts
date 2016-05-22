import { Component, OnInit} from '@angular/core';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';


@Component({
    moduleId: module.id,
    directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES],
    templateUrl: 'dashboard.html',
    styleUrls: ['dashboard.css']
})

export class Dashboard {

    constructor() {
    }

    public lineChartData = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
    ];
    public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions:any = {
        animation: false,
        responsive: true
    };
    public lineChartColours:Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend:boolean = false;
    public lineChartType:string = 'line';

    public randomize():void {
        let _lineChartData:Array<any> = new Array(this.lineChartData.length);
        for (let i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
            for (let j = 0; j < this.lineChartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }
        this.lineChartData = _lineChartData;
    }

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }


}


