import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyfamilytreeSharedModule } from '../../shared';
import {
    StaticSourceService,
    StaticSourcePopupService,
    StaticSourceComponent,
    StaticSourceDetailComponent,
    StaticSourceDialogComponent,
    StaticSourcePopupComponent,
    StaticSourceDeletePopupComponent,
    StaticSourceDeleteDialogComponent,
    staticSourceRoute,
    staticSourcePopupRoute,
    StaticSourceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...staticSourceRoute,
    ...staticSourcePopupRoute,
];

@NgModule({
    imports: [
        MyfamilytreeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StaticSourceComponent,
        StaticSourceDetailComponent,
        StaticSourceDialogComponent,
        StaticSourceDeleteDialogComponent,
        StaticSourcePopupComponent,
        StaticSourceDeletePopupComponent,
    ],
    entryComponents: [
        StaticSourceComponent,
        StaticSourceDialogComponent,
        StaticSourcePopupComponent,
        StaticSourceDeleteDialogComponent,
        StaticSourceDeletePopupComponent,
    ],
    providers: [
        StaticSourceService,
        StaticSourcePopupService,
        StaticSourceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyfamilytreeStaticSourceModule {}
