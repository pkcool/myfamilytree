import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MarriageComponent } from './marriage.component';
import { MarriageDetailComponent } from './marriage-detail.component';
import { MarriagePopupComponent } from './marriage-dialog.component';
import { MarriageDeletePopupComponent } from './marriage-delete-dialog.component';

@Injectable()
export class MarriageResolvePagingParams implements Resolve<any> {

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

export const marriageRoute: Routes = [
    {
        path: 'marriage',
        component: MarriageComponent,
        resolve: {
            'pagingParams': MarriageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.marriage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'marriage/:id',
        component: MarriageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.marriage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const marriagePopupRoute: Routes = [
    {
        path: 'marriage-new',
        component: MarriagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.marriage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'marriage/:id/edit',
        component: MarriagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.marriage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'marriage/:id/delete',
        component: MarriageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.marriage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
