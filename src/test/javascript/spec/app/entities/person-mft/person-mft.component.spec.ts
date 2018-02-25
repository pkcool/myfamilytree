/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyfamilytreeTestModule } from '../../../test.module';
import { PersonMftComponent } from '../../../../../../main/webapp/app/entities/person-mft/person-mft.component';
import { PersonMftService } from '../../../../../../main/webapp/app/entities/person-mft/person-mft.service';
import { PersonMft } from '../../../../../../main/webapp/app/entities/person-mft/person-mft.model';

describe('Component Tests', () => {

    describe('PersonMft Management Component', () => {
        let comp: PersonMftComponent;
        let fixture: ComponentFixture<PersonMftComponent>;
        let service: PersonMftService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyfamilytreeTestModule],
                declarations: [PersonMftComponent],
                providers: [
                    PersonMftService
                ]
            })
            .overrideTemplate(PersonMftComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonMftComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonMftService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PersonMft(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.people[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
