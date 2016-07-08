import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

declare var electron: any;

@Injectable()
export class IpcService {

    public mainProcessEvents = new EventEmitter();
    public versionEmitter = new EventEmitter();

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

            electron.ipcRenderer.on('version-receive', (event, version) => {
                this.versionEmitter.emit({version: version});
                console.info('version-receive', version);
            });

            electron.ipcRenderer.send('version-request');

        }
    }
}
