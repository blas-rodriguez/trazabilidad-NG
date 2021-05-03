export class EntryLot{
    constructor(
        public id: number,
        public article_id: number,
        public notebook_id: number,
        public carrier_id: number,
        public gross: number,
        public tare: number,
        public packaged: number,
        public discount: string,
        public number_plate: string,
        public used: any,
        public description: string
    ){}
}