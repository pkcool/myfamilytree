import { BaseEntity } from './../../shared';

export const enum Sex {
    'MALE',
    'FEMALE',
    'UNKNOWN'
}

export class Person implements BaseEntity {
    constructor(
        public id?: number,
        public idNumber?: string,
        public surname?: string,
        public foreNames?: string,
        public sex?: Sex,
        public placeOfBirth?: string,
        public dateOfBirth?: any,
        public placeOfDeath?: string,
        public dateOfDeath?: any,
        public briefNote?: string,
        public notes?: string,
        public fatherId?: number,
        public motherId?: number,
        public spouseId?: number,
        public sources?: BaseEntity[],
    ) {
    }
}
