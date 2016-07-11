import {Injectable} from '@angular/core';

@Injectable()
export class UtilService {

    constructor() {
    }

    public dateFormat(isoDate: string) {
        let date = new Date(isoDate);
        return this.realDateFormat(date);
    }

    public realDateFormat(date: Date) {
        return '      ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + '      ';
    }

}

