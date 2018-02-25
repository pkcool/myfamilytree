import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { StaticSource } from './static-source.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StaticSource>;

@Injectable()
export class StaticSourceService {

    private resourceUrl =  SERVER_API_URL + 'api/static-sources';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/static-sources';

    constructor(private http: HttpClient) { }

    create(staticSource: StaticSource): Observable<EntityResponseType> {
        const copy = this.convert(staticSource);
        return this.http.post<StaticSource>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(staticSource: StaticSource): Observable<EntityResponseType> {
        const copy = this.convert(staticSource);
        return this.http.put<StaticSource>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<StaticSource>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StaticSource[]>> {
        const options = createRequestOption(req);
        return this.http.get<StaticSource[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StaticSource[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<StaticSource[]>> {
        const options = createRequestOption(req);
        return this.http.get<StaticSource[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StaticSource[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StaticSource = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<StaticSource[]>): HttpResponse<StaticSource[]> {
        const jsonResponse: StaticSource[] = res.body;
        const body: StaticSource[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to StaticSource.
     */
    private convertItemFromServer(staticSource: StaticSource): StaticSource {
        const copy: StaticSource = Object.assign({}, staticSource);
        return copy;
    }

    /**
     * Convert a StaticSource to a JSON which can be sent to the server.
     */
    private convert(staticSource: StaticSource): StaticSource {
        const copy: StaticSource = Object.assign({}, staticSource);
        return copy;
    }
}
