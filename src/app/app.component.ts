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

	// Bandera para el ordenamiento ascendente o descendente
	ordenAscendente: boolean = true;

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
			seleccionada: false,
			destacada: false
		};
		this.tareas.push(tarea);

		// Limpiamos el formulario
		this.nuevaTarea.id = 0;
		this.nuevaTarea.titulo = '';
		this.nuevaTarea.minutos = 0;
	}

	eliminarTareasSeleccionadas() {
		// Con el filtro que creamos anteriormente de 'seleccionada', buscamos las tareas seleccionadas y las eliminamos
		this.tareas = this.tareas.filter((tarea) => !tarea.seleccionada);
	}

	// El ordenamiento se logra porque acepta únicamente objetos de tipo Tarea
	ordenarPor(campo: keyof Tarea) {
		this.tareas.sort((a, b) => {
			let comparacion = 0;
	  
			if (a[campo] > b[campo]) {
				comparacion = 1;
		  	} 
			else if (a[campo] < b[campo]) {
				comparacion = -1;
		  	}
	  
		  	if (!this.ordenAscendente) {
				comparacion *= -1;
		  	}
	  
		  	return comparacion;
		});
	  
		// Obtener el índice de la tarea seleccionada (si hay alguna)
		var tareaSeleccionada = this.tareas.find(tarea => tarea.seleccionada);
		var indiceSeleccionado = tareaSeleccionada ? this.tareas.indexOf(tareaSeleccionada) : -1;
	  
		// Si hay una tarea seleccionada, moverla a la nueva posición
		if (indiceSeleccionado !== -1) {
		  	var tarea = this.tareas.splice(indiceSeleccionado, 1)[0];
		  	this.tareas.splice(0, 0, tarea);
		}
	  
		// Invertir el estado de ordenAscendente
		this.ordenAscendente = !this.ordenAscendente;
	}

	// Verifica si al menos existe una tarea seleccionada
	hayTareasSeleccionadas(): boolean {
		if (this.tareas && this.tareas.length > 0) {
			return this.tareas.some(tarea => tarea.seleccionada);
		}
		return false;
	}
	  
	// Destaca las tareas seleccionadas y si están destacadas, poder volverlas a su estado normal
	destacarTareasSeleccionadas() {
		const tareasSeleccionadas = this.tareas.filter(tarea => tarea.seleccionada);
	  
		if (tareasSeleccionadas.length > 0) {
			const algunaDestacada = tareasSeleccionadas.some(tarea => tarea.destacada);
	  
			tareasSeleccionadas.forEach(tarea => {
			if (algunaDestacada && tarea.destacada) {
				tarea.destacada = false;
			} else {
				tarea.destacada = true;
			}
			});
		}
	}

	ordenarTareasAleatoriamente() {
		
		// Copiar el array original de tareas
		const tareasCopiadas = [...this.tareas];
	  
		// Ordenar aleatoriamente las tareas
		for (let i = tareasCopiadas.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[tareasCopiadas[i], tareasCopiadas[j]] = [tareasCopiadas[j], tareasCopiadas[i]];
		}
	  
		// Asignar el nuevo orden a las tareas
		this.tareas = tareasCopiadas;
	}
}
