import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Marriage } from './marriage.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Marriage>;

@Injectable()
export class MarriageService {

    private resourceUrl =  SERVER_API_URL + 'api/marriages';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/marriages';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(marriage: Marriage): Observable<EntityResponseType> {
        const copy = this.convert(marriage);
        return this.http.post<Marriage>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(marriage: Marriage): Observable<EntityResponseType> {
        const copy = this.convert(marriage);
        return this.http.put<Marriage>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Marriage>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Marriage[]>> {
        const options = createRequestOption(req);
        return this.http.get<Marriage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Marriage[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Marriage[]>> {
        const options = createRequestOption(req);
        return this.http.get<Marriage[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Marriage[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Marriage = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Marriage[]>): HttpResponse<Marriage[]> {
        const jsonResponse: Marriage[] = res.body;
        const body: Marriage[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Marriage.
     */
    private convertItemFromServer(marriage: Marriage): Marriage {
        const copy: Marriage = Object.assign({}, marriage);
        copy.dateOfMarriage = this.dateUtils
            .convertLocalDateFromServer(marriage.dateOfMarriage);
        copy.endOfMarriage = this.dateUtils
            .convertLocalDateFromServer(marriage.endOfMarriage);
        return copy;
    }

    /**
     * Convert a Marriage to a JSON which can be sent to the server.
     */
    private convert(marriage: Marriage): Marriage {
        const copy: Marriage = Object.assign({}, marriage);
        copy.dateOfMarriage = this.dateUtils
            .convertLocalDateToServer(marriage.dateOfMarriage);
        copy.endOfMarriage = this.dateUtils
            .convertLocalDateToServer(marriage.endOfMarriage);
        return copy;
    }
}
