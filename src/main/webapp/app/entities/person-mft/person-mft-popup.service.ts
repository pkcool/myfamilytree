import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { PersonMft } from './person-mft.model';
import { PersonMftService } from './person-mft.service';

@Injectable()
export class PersonMftPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private personService: PersonMftService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.personService.find(id)
                    .subscribe((personResponse: HttpResponse<PersonMft>) => {
                        const person: PersonMft = personResponse.body;
                        if (person.dateOfBirth) {
                            person.dateOfBirth = {
                                year: person.dateOfBirth.getFullYear(),
                                month: person.dateOfBirth.getMonth() + 1,
                                day: person.dateOfBirth.getDate()
                            };
                        }
                        if (person.dateOfDeath) {
                            person.dateOfDeath = {
                                year: person.dateOfDeath.getFullYear(),
                                month: person.dateOfDeath.getMonth() + 1,
                                day: person.dateOfDeath.getDate()
                            };
                        }
                        this.ngbModalRef = this.personModalRef(component, person);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.personModalRef(component, new PersonMft());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    personModalRef(component: Component, person: PersonMft): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.person = person;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
