export class Buyer{
    constructor(
        public id: number,
        public cif: string,
        public company: string,
        public direction: string,
        public location: string,
        public province: string,
        public postcode: string,
        public country: string,
        public storehouse: string,
        public description: string
    ){}
}