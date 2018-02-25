import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MarriageMftComponent } from './marriage-mft.component';
import { MarriageMftDetailComponent } from './marriage-mft-detail.component';
import { MarriageMftPopupComponent } from './marriage-mft-dialog.component';
import { MarriageMftDeletePopupComponent } from './marriage-mft-delete-dialog.component';

@Injectable()
export class MarriageMftResolvePagingParams implements Resolve<any> {

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
        path: 'marriage-mft',
        component: MarriageMftComponent,
        resolve: {
            'pagingParams': MarriageMftResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.marriage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'marriage-mft/:id',
        component: MarriageMftDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.marriage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const marriagePopupRoute: Routes = [
    {
        path: 'marriage-mft-new',
        component: MarriageMftPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.marriage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'marriage-mft/:id/edit',
        component: MarriageMftPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.marriage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'marriage-mft/:id/delete',
        component: MarriageMftDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.marriage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
