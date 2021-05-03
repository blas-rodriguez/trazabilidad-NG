export class Pale{
    constructor(
        public id: number,
        public packaging_line_id: number,
        public container_id: number,
        public batch_output_id: number,
        public gross: number,
        public tare: number,
        public packaged: string,
        public pieces: number,
        public description: string
    ){}
}