import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { ServeLog } from './serve-log';

console.log(environment.severLog);
@Injectable({ providedIn:'root' })
export class ServeLogService {

    constructor(private http:HttpClient){}

    public log(log:ServeLog){
        return this.http.post(`${environment.severLog}/infra/log`, log);
    }
 }