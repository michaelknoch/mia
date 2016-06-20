import {
    Component, OnDestroy, OnInit, OnChanges, EventEmitter, ElementRef, Input,
    Output
} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'loading',
    templateUrl: 'loading.html',
    styleUrls: ['loading.css'],
})

export class Loading {

    @Input() spinning: boolean = true;

    constructor() {
    }


}


