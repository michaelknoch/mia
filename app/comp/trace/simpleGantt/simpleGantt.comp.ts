import {Component, OnInit, OnChanges, SimpleChanges, Input} from '@angular/core'

@Component({
    moduleId: module.id,
    selector: 'simple-gantt',
    templateUrl: 'simpleGantt.html',
    styleUrls: ['simpleGantt.css'],
})

export class SimpleGantt {

    @Input() private nodes;
    constructor() {
    }
}
