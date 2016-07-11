///<reference path="../typings/browser.d.ts" />
///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/socket.io-client/socket.io-client.d.ts"/>

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
import {GraphService} from "./service/graph.service";

import {
    PlatformLocation,
    Location,
    LocationStrategy,
    HashLocationStrategy,
    PathLocationStrategy,
    APP_BASE_HREF }
    from '@angular/common';

import {ApplicationMetaPickerService} from "./comp/applicationMetaPicker/applicationMetaPicker.service";
import {LocalStorageService, LocalStorageSubscriber} from 'angular2-localstorage/dist';
import {TraceService} from "./comp/trace/trace.service";
import {IpcService} from "./service/ipc.service";
import {UtilService} from "../dist/service/util.service";

var appPromise = bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    ApplicationService,
    UserService,
    SystemService,
    DataService,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provide(APP_BASE_HREF, {useValue: '/'}),
    AUTH_PROVIDERS,
    provide(BrowserXhr, {useClass: CustomBrowserXhr}),
    MetricService,
    GraphService,
    ApplicationMetaPickerService,
    LocalStorageService,
    TraceService,
    IpcService,
    UtilService
]);

LocalStorageSubscriber(appPromise);