///<reference path="../typings/browser.d.ts" />

import {AppComponent} from './app.component';
import {provide} from '@angular/core';
import {bootstrap}    from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';

import {HTTP_PROVIDERS, BrowserXhr} from '@angular/http';
import {ApplicationService} from './service/application/application.service';
import {UserService} from "./service/user/user.service";

import {SystemService} from "./service/system/system.service";
import {DataService} from "./service/data.service";
import {AuthHttp, AuthConfig, AUTH_PROVIDERS} from 'angular2-jwt';
import {CustomBrowserXhr} from "./service/CustomBrowserXhr";
import {MetricService} from "./service/metric/metric.service";

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
    ApplicationService,
    UserService,
    SystemService,
    DataService,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provide(APP_BASE_HREF, { useValue: '/' }),
    AUTH_PROVIDERS,
    provide(BrowserXhr, { useClass: CustomBrowserXhr }),
    MetricService
]);