import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MyfamilytreePersonMftModule } from './person-mft/person-mft.module';
import { MyfamilytreeMarriageMftModule } from './marriage-mft/marriage-mft.module';
import { MyfamilytreeStaticSourceMftModule } from './static-source-mft/static-source-mft.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        MyfamilytreePersonMftModule,
        MyfamilytreeMarriageMftModule,
        MyfamilytreeStaticSourceMftModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyfamilytreeEntityModule {}
