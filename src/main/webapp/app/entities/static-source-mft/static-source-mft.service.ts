import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { StaticSourceMft } from './static-source-mft.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StaticSourceMft>;

@Injectable()
export class StaticSourceMftService {

    private resourceUrl =  SERVER_API_URL + 'api/static-sources';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/static-sources';

    constructor(private http: HttpClient) { }

    create(staticSource: StaticSourceMft): Observable<EntityResponseType> {
        const copy = this.convert(staticSource);
        return this.http.post<StaticSourceMft>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(staticSource: StaticSourceMft): Observable<EntityResponseType> {
        const copy = this.convert(staticSource);
        return this.http.put<StaticSourceMft>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<StaticSourceMft>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StaticSourceMft[]>> {
        const options = createRequestOption(req);
        return this.http.get<StaticSourceMft[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StaticSourceMft[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<StaticSourceMft[]>> {
        const options = createRequestOption(req);
        return this.http.get<StaticSourceMft[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StaticSourceMft[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StaticSourceMft = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<StaticSourceMft[]>): HttpResponse<StaticSourceMft[]> {
        const jsonResponse: StaticSourceMft[] = res.body;
        const body: StaticSourceMft[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to StaticSourceMft.
     */
    private convertItemFromServer(staticSource: StaticSourceMft): StaticSourceMft {
        const copy: StaticSourceMft = Object.assign({}, staticSource);
        return copy;
    }

    /**
     * Convert a StaticSourceMft to a JSON which can be sent to the server.
     */
    private convert(staticSource: StaticSourceMft): StaticSourceMft {
        const copy: StaticSourceMft = Object.assign({}, staticSource);
        return copy;
    }
}
