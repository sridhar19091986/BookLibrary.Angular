
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ExceptionService, ToastService, SpinnerService } from '../core';
import { Observable } from 'rxjs/Observable';
import { IEntity } from './IEntity';

@Injectable()
export class BaseService {

    public url: string;

    constructor(protected http: Http,
        protected exceptionService: ExceptionService,
        protected toastService: ToastService,
        protected spinnerService: SpinnerService) { }

    get<T>() {
        this.spinnerService.show();
        return <Observable<T[]>>this.http
            .get(this.url)
            .map(res => this.extractData<T[]>(res))
            .catch(this.exceptionService.catchBadResponse)
            .finally(() => this.spinnerService.hide());
    }

    getOne<T>(id: string) {
        this.spinnerService.show();
        return <Observable<T>>this.http
            .get(`${this.url}/${id}`)
            .map(res => this.extractData<T>(res))
            .catch(this.exceptionService.catchBadResponse)
            .finally(() => this.spinnerService.hide());
    }

    update<T extends IEntity>(entity: T) {
        let body = JSON.stringify(entity);
        this.spinnerService.show();
        return <Observable<T>>this.http
            .put(`${this.url}/${entity._id}`, body, this.setRequestOptions())
            .map(res => this.extractData<T>(res))
            .catch(this.exceptionService.catchBadResponse)
            .finally(() => this.spinnerService.hide());
    }

    add<T>(entity: T) {
        let body = JSON.stringify(entity);
        this.spinnerService.show();
        return <Observable<T>>this.http
            .post(`${this.url}`, body, this.setRequestOptions())
            .map(res => <T>res.json().data)
            .catch(this.exceptionService.catchBadResponse)
            .finally(() => this.spinnerService.hide());
    }

    delete<T extends IEntity>(entity: T) {
        this.spinnerService.show();
        return <Observable<T>>this.http
            .delete(`${this.url}/${entity._id}`)
            .map(res => this.extractData<T>(res))
            .catch(this.exceptionService.catchBadResponse)
            .finally(() => this.spinnerService.hide());
    }

    private extractData<T>(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json ? res.json() : null;
        return <T>(body && body || {});
    }

    private setRequestOptions(){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions();
        options.headers = headers;
        return options;
    }

}