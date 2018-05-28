import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyfamilytreeSharedModule } from '../shared';

import {FamilyTreeComponent} from './familytree.component';
import {FAMILY_TREE_VIEW_ROUTE} from './familytree.route';
import {FamilyMemberService} from './familymember.service';
import {FamilyMemberComponent} from './familymemeber.component';

@NgModule({
    imports: [
        MyfamilytreeSharedModule,
        RouterModule.forChild(FAMILY_TREE_VIEW_ROUTE)
    ],
    declarations: [
        FamilyTreeComponent,
        FamilyMemberComponent
    ],
    entryComponents: [
        FamilyTreeComponent,
        FamilyMemberComponent
    ],
    providers: [
        FamilyMemberService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FamilyTreeViewModule {}
