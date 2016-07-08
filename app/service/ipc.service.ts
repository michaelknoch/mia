import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

declare var electron: any;

@Injectable()
export class IpcService {

    public mainProcessEvents = new EventEmitter();

    constructor() {
        
        if ('undefined' !== typeof electron) {

            electron.ipcRenderer.on('update-available', () => {
                this.mainProcessEvents.emit('update-available');
                console.info('update-available');
            });

            electron.ipcRenderer.on('update-downloaded', () => {
                this.mainProcessEvents.emit('update-downloaded');
                console.info('update-downloaded');
            });

        }
    }
}
