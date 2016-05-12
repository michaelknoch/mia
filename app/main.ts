///<reference path="../typings/browser.d.ts" />

import {AppComponent} from './app.component';
import {provide} from '@angular/core';
import {bootstrap}    from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router';

import {HTTP_PROVIDERS} from '@angular/http';
import {CostumerService} from './service/costumer/costumer.service';
import {UserService} from "./service/user/user.service";

import {SystemService} from "./service/system/system.service";
import {DataService} from "./service/data.service";

import {
    PlatformLocation,
    Location,
    LocationStrategy,
    HashLocationStrategy,
    PathLocationStrategy,
    APP_BASE_HREF }
    from '@angular/common';


bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    CostumerService,
    UserService,
    SystemService,
    DataService,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provide(APP_BASE_HREF, { useValue: '/' })
]);