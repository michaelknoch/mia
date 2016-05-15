import { Component, OnInit} from '@angular/core';
import {CHART_DIRECTIVES} from '../chartJS/charts';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';


@Component({
    moduleId: module.id,
    directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES],
    templateUrl: 'dashboard.html',
})

export class Dashboard {

    constructor() {
    }

    public lineChartData:Array<any> = [
        [65, 59, 80, 81, 56, 55, 40]
    ];
    public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartSeries:Array<any> = ['Series A', 'Series B', 'Series C'];
    public lineChartOptions:any = {
        animation: false,
        responsive: false,
        multiTooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel %>: <%}%><%= value %>'
    };
    public lineChartColours:Array<any> = [
        { // grey
            fillColor: 'rgba(148,159,177,0.2)',
            strokeColor: 'rgba(148,159,177,1)',
            pointColor: 'rgba(148,159,177,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            fillColor: 'rgba(77,83,96,0.2)',
            strokeColor: 'rgba(77,83,96,1)',
            pointColor: 'rgba(77,83,96,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(77,83,96,1)'
        },
        { // grey
            fillColor: 'rgba(148,159,177,0.2)',
            strokeColor: 'rgba(148,159,177,1)',
            pointColor: 'rgba(148,159,177,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';


}


