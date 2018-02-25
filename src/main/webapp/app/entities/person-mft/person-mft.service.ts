import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PersonMft } from './person-mft.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PersonMft>;

@Injectable()
export class PersonMftService {

    private resourceUrl =  SERVER_API_URL + 'api/people';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/people';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(person: PersonMft): Observable<EntityResponseType> {
        const copy = this.convert(person);
        return this.http.post<PersonMft>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(person: PersonMft): Observable<EntityResponseType> {
        const copy = this.convert(person);
        return this.http.put<PersonMft>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PersonMft>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PersonMft[]>> {
        const options = createRequestOption(req);
        return this.http.get<PersonMft[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PersonMft[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<PersonMft[]>> {
        const options = createRequestOption(req);
        return this.http.get<PersonMft[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PersonMft[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PersonMft = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PersonMft[]>): HttpResponse<PersonMft[]> {
        const jsonResponse: PersonMft[] = res.body;
        const body: PersonMft[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PersonMft.
     */
    private convertItemFromServer(person: PersonMft): PersonMft {
        const copy: PersonMft = Object.assign({}, person);
        copy.dateOfBirth = this.dateUtils
            .convertLocalDateFromServer(person.dateOfBirth);
        copy.dateOfDeath = this.dateUtils
            .convertLocalDateFromServer(person.dateOfDeath);
        return copy;
    }

    /**
     * Convert a PersonMft to a JSON which can be sent to the server.
     */
    private convert(person: PersonMft): PersonMft {
        const copy: PersonMft = Object.assign({}, person);
        copy.dateOfBirth = this.dateUtils
            .convertLocalDateToServer(person.dateOfBirth);
        copy.dateOfDeath = this.dateUtils
            .convertLocalDateToServer(person.dateOfDeath);
        return copy;
    }
}
