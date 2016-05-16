import { Component, OnInit} from '@angular/core';
import {CHART_DIRECTIVES} from '../chartJS/charts';
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

    public data = {
        type: 'line',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                borderColor: "rgba(75,192,192,1)",
            }]
        },
        options: {
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    }


}


