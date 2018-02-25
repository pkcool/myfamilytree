import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { StaticSourceMftComponent } from './static-source-mft.component';
import { StaticSourceMftDetailComponent } from './static-source-mft-detail.component';
import { StaticSourceMftPopupComponent } from './static-source-mft-dialog.component';
import { StaticSourceMftDeletePopupComponent } from './static-source-mft-delete-dialog.component';

@Injectable()
export class StaticSourceMftResolvePagingParams implements Resolve<any> {

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

export const staticSourceRoute: Routes = [
    {
        path: 'static-source-mft',
        component: StaticSourceMftComponent,
        resolve: {
            'pagingParams': StaticSourceMftResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.staticSource.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'static-source-mft/:id',
        component: StaticSourceMftDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.staticSource.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const staticSourcePopupRoute: Routes = [
    {
        path: 'static-source-mft-new',
        component: StaticSourceMftPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.staticSource.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'static-source-mft/:id/edit',
        component: StaticSourceMftPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.staticSource.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'static-source-mft/:id/delete',
        component: StaticSourceMftDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.staticSource.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
