export class Tarea {
    constructor(
        public id: number,
        public titulo: string,
        public minutos: number,
        public seleccionada: boolean = false,
        public destacada: boolean = false
    ){}
}