import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'feed',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'feed.html',
    styleUrls: ['feed.css'],
})

export class Feed {

    constructor() {}

}
