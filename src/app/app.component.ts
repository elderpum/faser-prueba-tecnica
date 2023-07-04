import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	tareas: Tarea[];
	
	// Objeto Tarea
	nuevaTarea = {
		id: 0,
		titulo: '',
		minutos: 0,
		seleccionada: false
	}

	constructor(
        public service: AppService,
	) { }
	
	ngOnInit() {
		this.obtenerTareas();
	}

	async obtenerTareas() {
		this.tareas = await this.service.obtenerTareas();
	}

	agregarTarea() {
		// Creamos un objeto nuevo de tareas y lo agregamos al arreglo
		var tarea = {
			id: this.nuevaTarea.id,
			titulo: this.nuevaTarea.titulo,
			minutos: this.nuevaTarea.minutos,
			seleccionada: false
		};
		this.tareas.push(tarea);

		// Limpiamos el formulario
		this.nuevaTarea.id = 0;
		this.nuevaTarea.titulo = '';
		this.nuevaTarea.minutos = 0;
	}
}
