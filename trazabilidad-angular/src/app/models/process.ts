export class Process{
    constructor(
        public id: number,
        public notebook_id: number,
        public process: string,
        public dated: any,
        public description: string
    ){}
}