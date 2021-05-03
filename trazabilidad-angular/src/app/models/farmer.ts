export class Farmer{
    constructor(
        public id: number,
        public zone_id: number,
        public nif: string,
        public name: string,
        public surname: string,
        public direction: string,
        public location: string,
        public province: string,
        public postcode: string,
        public description: string
    ){}
}