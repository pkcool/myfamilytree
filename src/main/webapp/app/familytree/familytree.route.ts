import { Route } from '@angular/router';

import {FamilyTreeComponent} from './familytree.component';

export const FAMILY_TREE_VIEW_ROUTE: Route = {
    path: 'familytree',
    component: FamilyTreeComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'home.title'
    }
};
