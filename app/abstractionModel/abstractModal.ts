import {Output, EventEmitter} from '@angular/core'

export abstract class AbstractModal {

    private visible: boolean = false;
    @Output() public update: EventEmitter<any> = new EventEmitter();

    public show() {
        this.visible = true;
    }

    public hide() {
        this.visible = false;
    }
}

