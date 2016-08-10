import {Injectable} from '@angular/core';

export class Modal {
    open: boolean;
    title: string;
    body: string;
}

@Injectable()
export class GenericModalService {

    private open: boolean = false;
    private title: string;
    private body: string;

    constructor() {

    }

    public close() {
        this.open = false;
    }

    public show(title: string, body: string) {
        this.title = title;
        this.body = body;
        this.open = true;
    }

    public getModal(): Modal {
        return {
            open: this.open,
            title: this.title,
            body: this.body
        }
    }
}
