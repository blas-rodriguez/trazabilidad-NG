export class OutputDetail{
    constructor(
        public id: number,
        public packaging_line_id: number,
        public entry_lot_id: number,
        public kg_used: number,
        public description: string
    ){}
}