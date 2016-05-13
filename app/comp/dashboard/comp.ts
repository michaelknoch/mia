import { Component, OnInit } from '@angular/core';
import {ZingChart} from "../zingChart/zingChart.comp";


@Component({
    moduleId: module.id,
    directives: [ZingChart],
    templateUrl: 'dashboard.html',
})

export class Dashboard {

    charts;

    constructor() {

        this.charts = [{
            "id": 'chart-1',
            "data": {
                "type": 'line',
                "series": [{
                    "values": [2, 3, 4, 5, 3, 3, 2]
                }],
            },
            "height": 400,
            "width": 600
        }]

    }


}


