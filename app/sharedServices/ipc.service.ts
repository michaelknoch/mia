import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

declare var electron: any;
declare var Notification: any;

@Injectable()
export class IpcService {

    public mainProcessEvents = new EventEmitter();
    public versionEmitter = new EventEmitter();

    constructor() {

        if (typeof electron !== 'undefined') {

            electron.ipcRenderer.on('update-available', () => {
                this.mainProcessEvents.emit('update-available');
                console.info('update-available');
                this.notification('update available', 'Update')
            });

            electron.ipcRenderer.on('update-downloaded', () => {
                this.mainProcessEvents.emit('update-downloaded');
                console.info('update-downloaded');
                this.notification('update downloaded', 'Update')
            });

            electron.ipcRenderer.on('version-receive', (event, version) => {
                this.versionEmitter.emit({version: version});
                console.info('version-receive', version);
                this.notification('Version: ' + version, 'Appversion')
            });

            electron.ipcRenderer.send('version-request');

        }
    }

    private notification(body: string, title: string) {
        let myNotification = new Notification(title, {
            body: body,
            silent: true
        });
        new Audio('dist/assets/sounds/message.mp3').play();
    }
}
