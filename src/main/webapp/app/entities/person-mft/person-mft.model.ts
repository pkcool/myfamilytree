import { BaseEntity } from './../../shared';

export const enum Sex {
    'MALE',
    'FEMALE',
    'UNKNOWN'
}

export class PersonMft implements BaseEntity {
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
        public personId?: number,
        public children?: BaseEntity[],
        public sources?: BaseEntity[],
    ) {
    }
}
