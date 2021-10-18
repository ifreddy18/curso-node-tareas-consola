require("colors");
const Tarea = require("./tarea");
/**
 *  _listado:
 *    { uuid-1235-12354: {id:uuid-1235-12354, desc:asasas, comletadoEn:846464}}
 */

class Tareas {
	constructor() {
		this._listado = {};
	}

    // Array del objeto _listado
	get listadoArray() {
		const listado = [];

		Object.keys(this._listado).forEach((key) => {
			const tarea = this._listado[key];
			listado.push(tarea);
		});

		return listado;
	}

	cargarTareasFromArray(tareas = []) {
		console.log(tareas);
		tareas.forEach((tarea) => {
			this._listado[tarea.id] = tarea;
		});
	}

	crearTarea(desc = "") {
		const tarea = new Tarea(desc);

		this._listado[tarea.id] = tarea;
	}

    borrarTarea( id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

	listadoCompleto() {
		console.log("\n");
		this.listadoArray.forEach((tarea, i) => {
			let tareaString = `${i + 1}`.green + `. ${tarea.desc} :: `;

			tareaString +=
				tarea.completadoEn !== null
					? 'Completado'.green
					: 'Pendiente'.red;

			console.log(tareaString);
		});
	}

	listarPorEstado(completadas = true) {
		console.log("\n");

		let index = 1;

		this.listadoArray.forEach((tarea) => {
			let tareaString = `${index}`.green + `. ${tarea.desc} :: `;

            tareaString += tarea.completadoEn !== null
                            ? `${ tarea.completadoEn }`.green
                            : 'Pendiente'.red;

			if (
				(completadas && tarea.completadoEn !== null) ||
				(!completadas && tarea.completadoEn === null)
			) {
				console.log(tareaString);
				index++;
			}
		});
	}

    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {
            
            const tarea = this._listado[id];
            
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArray.forEach( tarea => {
            if (!ids.includes( tarea.id )) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;
