import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { MarriageMft } from './marriage-mft.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MarriageMft>;

@Injectable()
export class MarriageMftService {

    private resourceUrl =  SERVER_API_URL + 'api/marriages';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/marriages';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(marriage: MarriageMft): Observable<EntityResponseType> {
        const copy = this.convert(marriage);
        return this.http.post<MarriageMft>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(marriage: MarriageMft): Observable<EntityResponseType> {
        const copy = this.convert(marriage);
        return this.http.put<MarriageMft>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MarriageMft>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MarriageMft[]>> {
        const options = createRequestOption(req);
        return this.http.get<MarriageMft[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MarriageMft[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<MarriageMft[]>> {
        const options = createRequestOption(req);
        return this.http.get<MarriageMft[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MarriageMft[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MarriageMft = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MarriageMft[]>): HttpResponse<MarriageMft[]> {
        const jsonResponse: MarriageMft[] = res.body;
        const body: MarriageMft[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MarriageMft.
     */
    private convertItemFromServer(marriage: MarriageMft): MarriageMft {
        const copy: MarriageMft = Object.assign({}, marriage);
        copy.dateOfMarriage = this.dateUtils
            .convertLocalDateFromServer(marriage.dateOfMarriage);
        copy.endOfMarriage = this.dateUtils
            .convertLocalDateFromServer(marriage.endOfMarriage);
        return copy;
    }

    /**
     * Convert a MarriageMft to a JSON which can be sent to the server.
     */
    private convert(marriage: MarriageMft): MarriageMft {
        const copy: MarriageMft = Object.assign({}, marriage);
        copy.dateOfMarriage = this.dateUtils
            .convertLocalDateToServer(marriage.dateOfMarriage);
        copy.endOfMarriage = this.dateUtils
            .convertLocalDateToServer(marriage.endOfMarriage);
        return copy;
    }
}
