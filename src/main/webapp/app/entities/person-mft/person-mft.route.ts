import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PersonMftComponent } from './person-mft.component';
import { PersonMftDetailComponent } from './person-mft-detail.component';
import { PersonMftPopupComponent } from './person-mft-dialog.component';
import { PersonMftDeletePopupComponent } from './person-mft-delete-dialog.component';

@Injectable()
export class PersonMftResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const personRoute: Routes = [
    {
        path: 'person-mft',
        component: PersonMftComponent,
        resolve: {
            'pagingParams': PersonMftResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.person.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'person-mft/:id',
        component: PersonMftDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.person.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personPopupRoute: Routes = [
    {
        path: 'person-mft-new',
        component: PersonMftPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person-mft/:id/edit',
        component: PersonMftPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person-mft/:id/delete',
        component: PersonMftDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
