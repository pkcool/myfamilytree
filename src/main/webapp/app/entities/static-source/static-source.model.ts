import { BaseEntity } from './../../shared';

export class StaticSource implements BaseEntity {
    constructor(
        public id?: number,
        public sourcePath?: string,
        public comment?: string,
        public people?: BaseEntity[],
    ) {
    }
}
