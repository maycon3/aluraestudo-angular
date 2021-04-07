import { ErrorHandler, Injector, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as StackTrace from 'stacktrace-js';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserService } from 'src/app/core/user/user.service';
import { ServeLogService } from './server-log.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    
    constructor(private injector: Injector){}
    
    handleError(error: any): void {
        console.log('passei pelo handler');
        const location = this.injector.get(LocationStrategy);
        const userService = this.injector.get(UserService);
        const serverLogService = this.injector.get(ServeLogService);
        const router = this.injector.get(Router);
        
        const message = error.message
        ? error.message :
        error.toString();

        const url = location instanceof PathLocationStrategy
            ? location.path()
            : '';

        if(environment.production) router.navigate(['/error']);
            
        StackTrace
        .fromError(error)
        .then(stackFrames => {
            const stackAsString = stackFrames
                .map(sf => sf.toString())
                .join('\n')

                console.log(message);
                console.log(stackAsString);
                serverLogService.log({ message, url,
                     userName: userService.getUserName(), stack: stackAsString})
                     .subscribe(
                         ()=>console.log('Error logged on server'),
                         err=>{
                             console.log(err);
                             console.log('Fail to send error log to server');
                         }
                     );

            
        });
    }

}