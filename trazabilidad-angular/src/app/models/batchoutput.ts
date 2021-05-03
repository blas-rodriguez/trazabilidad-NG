export class BatchOutput{
    constructor(
        public id: number,
        public buyer_id: number,
        public article_id: number,
        public carriers_id: number,
        public completed: any,
        public loaded: any,
        public description: string
    ){}
}