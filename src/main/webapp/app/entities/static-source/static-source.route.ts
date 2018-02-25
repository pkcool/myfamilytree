import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { StaticSourceComponent } from './static-source.component';
import { StaticSourceDetailComponent } from './static-source-detail.component';
import { StaticSourcePopupComponent } from './static-source-dialog.component';
import { StaticSourceDeletePopupComponent } from './static-source-delete-dialog.component';

@Injectable()
export class StaticSourceResolvePagingParams implements Resolve<any> {

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
        path: 'static-source',
        component: StaticSourceComponent,
        resolve: {
            'pagingParams': StaticSourceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.staticSource.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'static-source/:id',
        component: StaticSourceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.staticSource.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const staticSourcePopupRoute: Routes = [
    {
        path: 'static-source-new',
        component: StaticSourcePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.staticSource.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'static-source/:id/edit',
        component: StaticSourcePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.staticSource.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'static-source/:id/delete',
        component: StaticSourceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myfamilytreeApp.staticSource.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
