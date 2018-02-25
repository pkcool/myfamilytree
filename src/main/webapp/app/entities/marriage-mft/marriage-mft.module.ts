import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyfamilytreeSharedModule } from '../../shared';
import {
    MarriageMftService,
    MarriageMftPopupService,
    MarriageMftComponent,
    MarriageMftDetailComponent,
    MarriageMftDialogComponent,
    MarriageMftPopupComponent,
    MarriageMftDeletePopupComponent,
    MarriageMftDeleteDialogComponent,
    marriageRoute,
    marriagePopupRoute,
    MarriageMftResolvePagingParams,
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
        MarriageMftComponent,
        MarriageMftDetailComponent,
        MarriageMftDialogComponent,
        MarriageMftDeleteDialogComponent,
        MarriageMftPopupComponent,
        MarriageMftDeletePopupComponent,
    ],
    entryComponents: [
        MarriageMftComponent,
        MarriageMftDialogComponent,
        MarriageMftPopupComponent,
        MarriageMftDeleteDialogComponent,
        MarriageMftDeletePopupComponent,
    ],
    providers: [
        MarriageMftService,
        MarriageMftPopupService,
        MarriageMftResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyfamilytreeMarriageMftModule {}
