///<reference path="../typings/browser.d.ts" />
///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/socket.io-client/socket.io-client.d.ts"/>

import {AppComponent} from './app.component';
import {provide} from '@angular/core';
import {bootstrap}    from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS, Router} from '@angular/router-deprecated';

import {HTTP_PROVIDERS, BrowserXhr} from '@angular/http';
import {ApplicationService} from './comp/applications/application.service';

import {SystemService} from "./comp/systemList/system.service";
import {AuthHttp, AuthConfig, AUTH_PROVIDERS} from 'angular2-jwt';
import {CustomBrowserXhr} from "./sharedServices/CustomBrowserXhr";
import {MetricService} from "./sharedServices/metric.service";
import {GraphService} from "./comp/graph/graph.service";

import {
    PlatformLocation,
    Location,
    LocationStrategy,
    HashLocationStrategy,
    PathLocationStrategy,
    APP_BASE_HREF }
    from '@angular/common';

import {MetaPickerService} from "./comp/metaPicker/metaPicker.service";
import {LocalStorageService, LocalStorageSubscriber} from 'angular2-localstorage/dist';
import {TraceService} from "./comp/trace/trace.service";
import {IpcService} from "./sharedServices/ipc.service";
import {UtilService} from "./sharedServices/util.service";
import {UserService} from "./sharedServices/user.service";
import {IUserService} from "./sharedServices/user.service.interface";
import {HttpInterceptor} from "./sharedServices/httpInterceptor"
import {Http, XHRBackend, RequestOptions} from "@angular/http"

var appPromise = bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    ApplicationService,
    provide(UserService, {useClass: UserService}),
    SystemService,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provide(APP_BASE_HREF, {useValue: '/'}),
    AUTH_PROVIDERS,
    provide(BrowserXhr, {useClass: CustomBrowserXhr}),
    MetricService,
    GraphService,
    MetaPickerService,
    LocalStorageService,
    TraceService,
    IpcService,
    UtilService,
    provide(Http, {
        useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router) => new HttpInterceptor(xhrBackend, requestOptions, router),
        deps: [XHRBackend, RequestOptions, Router]
    })
]);

LocalStorageSubscriber(appPromise);