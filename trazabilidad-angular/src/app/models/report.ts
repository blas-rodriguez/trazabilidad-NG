export class Report{
    constructor(
        public id: number,
        public batch_output_id: number,
        public entry_lot_id: number,
        public incidence: string,
        public solution: string
    ){}
}