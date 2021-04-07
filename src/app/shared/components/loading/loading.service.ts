import { Injectable } from '@angular/core';

import { Subject, Observable, pipe } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { LoadingType } from './loading-type';

@Injectable({ providedIn: 'root'})
export class LoadingService {

    loadingSubject = new Subject<LoadingType>();

    public getLoading() {
        return this.loadingSubject
        .asObservable()
        .pipe(startWith(LoadingType.STOPPED));
    }

    public start():void{
        this.loadingSubject.next(LoadingType.LOADING);
    }

    public stop():void{
        this.loadingSubject.next(LoadingType.STOPPED);
    }
}