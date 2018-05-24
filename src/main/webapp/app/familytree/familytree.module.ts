import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyfamilytreeSharedModule } from '../shared';

import {FamilyTreeComponent} from './familytree.component';
import {FAMILY_TREE_VIEW_ROUTE} from './familytree.route';

@NgModule({
    imports: [
        MyfamilytreeSharedModule,
        RouterModule.forChild([ FAMILY_TREE_VIEW_ROUTE ])
    ],
    declarations: [
        FamilyTreeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FamilyTreeViewModule {}
