/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MyfamilytreeTestModule } from '../../../test.module';
import { PersonMftDetailComponent } from '../../../../../../main/webapp/app/entities/person-mft/person-mft-detail.component';
import { PersonMftService } from '../../../../../../main/webapp/app/entities/person-mft/person-mft.service';
import { PersonMft } from '../../../../../../main/webapp/app/entities/person-mft/person-mft.model';

describe('Component Tests', () => {

    describe('PersonMft Management Detail Component', () => {
        let comp: PersonMftDetailComponent;
        let fixture: ComponentFixture<PersonMftDetailComponent>;
        let service: PersonMftService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyfamilytreeTestModule],
                declarations: [PersonMftDetailComponent],
                providers: [
                    PersonMftService
                ]
            })
            .overrideTemplate(PersonMftDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonMftDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonMftService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PersonMft(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.person).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
