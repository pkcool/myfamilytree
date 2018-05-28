import {Routes} from '@angular/router';

import {FamilyTreeComponent} from './familytree.component';
import {UserRouteAccessService} from '../shared';
import {FamilyMemberComponent} from './familymemeber.component';

export const FAMILY_TREE_VIEW_ROUTE: Routes = [{
    path: 'familytree',
    component: FamilyTreeComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'home.title'
    },
    canActivate: [UserRouteAccessService]
},
    {
    path: 'familymember/:id',
    component: FamilyMemberComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'myfamilytreeApp.person.home.title'
    },
    canActivate: [UserRouteAccessService]
    }

];
