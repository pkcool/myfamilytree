import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyfamilytreeSharedModule } from '../../shared';
import {
    MarriageService,
    MarriagePopupService,
    MarriageComponent,
    MarriageDetailComponent,
    MarriageDialogComponent,
    MarriagePopupComponent,
    MarriageDeletePopupComponent,
    MarriageDeleteDialogComponent,
    marriageRoute,
    marriagePopupRoute,
    MarriageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...marriageRoute,
    ...marriagePopupRoute,
];

@NgModule({
    imports: [
        MyfamilytreeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MarriageComponent,
        MarriageDetailComponent,
        MarriageDialogComponent,
        MarriageDeleteDialogComponent,
        MarriagePopupComponent,
        MarriageDeletePopupComponent,
    ],
    entryComponents: [
        MarriageComponent,
        MarriageDialogComponent,
        MarriagePopupComponent,
        MarriageDeleteDialogComponent,
        MarriageDeletePopupComponent,
    ],
    providers: [
        MarriageService,
        MarriagePopupService,
        MarriageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyfamilytreeMarriageModule {}
