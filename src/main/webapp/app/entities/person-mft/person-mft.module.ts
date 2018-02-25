import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyfamilytreeSharedModule } from '../../shared';
import {
    PersonMftService,
    PersonMftPopupService,
    PersonMftComponent,
    PersonMftDetailComponent,
    PersonMftDialogComponent,
    PersonMftPopupComponent,
    PersonMftDeletePopupComponent,
    PersonMftDeleteDialogComponent,
    personRoute,
    personPopupRoute,
    PersonMftResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...personRoute,
    ...personPopupRoute,
];

@NgModule({
    imports: [
        MyfamilytreeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PersonMftComponent,
        PersonMftDetailComponent,
        PersonMftDialogComponent,
        PersonMftDeleteDialogComponent,
        PersonMftPopupComponent,
        PersonMftDeletePopupComponent,
    ],
    entryComponents: [
        PersonMftComponent,
        PersonMftDialogComponent,
        PersonMftPopupComponent,
        PersonMftDeleteDialogComponent,
        PersonMftDeletePopupComponent,
    ],
    providers: [
        PersonMftService,
        PersonMftPopupService,
        PersonMftResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyfamilytreePersonMftModule {}
