import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyfamilytreeSharedModule } from '../../shared';
import {
    StaticSourceMftService,
    StaticSourceMftPopupService,
    StaticSourceMftComponent,
    StaticSourceMftDetailComponent,
    StaticSourceMftDialogComponent,
    StaticSourceMftPopupComponent,
    StaticSourceMftDeletePopupComponent,
    StaticSourceMftDeleteDialogComponent,
    staticSourceRoute,
    staticSourcePopupRoute,
    StaticSourceMftResolvePagingParams,
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
        StaticSourceMftComponent,
        StaticSourceMftDetailComponent,
        StaticSourceMftDialogComponent,
        StaticSourceMftDeleteDialogComponent,
        StaticSourceMftPopupComponent,
        StaticSourceMftDeletePopupComponent,
    ],
    entryComponents: [
        StaticSourceMftComponent,
        StaticSourceMftDialogComponent,
        StaticSourceMftPopupComponent,
        StaticSourceMftDeleteDialogComponent,
        StaticSourceMftDeletePopupComponent,
    ],
    providers: [
        StaticSourceMftService,
        StaticSourceMftPopupService,
        StaticSourceMftResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyfamilytreeStaticSourceMftModule {}
