import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { createRequestOption } from '../shared';
import {FamilyMember} from './familymemeber.model';

export type EntityResponseType = HttpResponse<FamilyMember>;

@Injectable()
export class FamilyMemberService {

    private resourceUrl =  SERVER_API_URL + 'api/people';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/people';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FamilyMember>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    search(req?: any): Observable<HttpResponse<FamilyMember[]>> {
        const options = createRequestOption(req);
        return this.http.get<FamilyMember[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FamilyMember[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FamilyMember = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FamilyMember[]>): HttpResponse<FamilyMember[]> {
        const jsonResponse: FamilyMember[] = res.body;
        const body: FamilyMember[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Family Memeber.
     */
    private convertItemFromServer(familyMember: FamilyMember): FamilyMember {
        const copy: FamilyMember = Object.assign({}, familyMember);
        copy.dateOfBirth = this.dateUtils
            .convertLocalDateFromServer(familyMember.dateOfBirth);
        copy.dateOfDeath = this.dateUtils
            .convertLocalDateFromServer(familyMember.dateOfDeath);
        return copy;
    }

}
