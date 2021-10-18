require('colors');

const { inquirerMenu, pausa, leerInput, listadoBorrarTarea, confirmar, listadoCompletarTarea } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const Tarea = require('./models/tarea');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

// const { mostrarMenu, pausa } = require('./helpers/mensajes');

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();
    
    if ( tareasDB ) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {

        opt = await inquirerMenu();

        switch (opt) {
            case '1': // Crear tarea
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;

            case '2': // Listar tareas
                tareas.listadoCompleto();
                break;

            case '3': // Listar tareas comletadas
                tareas.listarPorEstado();
                break;

            case '4': // Listar tareas pendientes
                tareas.listarPorEstado(false);   
                break;

            case '5': // Completar tarea
                const ids = await listadoCompletarTarea( tareas.listadoArray );
                tareas.toggleCompletadas( ids );
                break;

            case '6': // Borrar tarea
                const id = await listadoBorrarTarea( tareas.listadoArray );

                if ( id !== '0') {
                    const ok = await confirmar(`Desea borrar este elemento?`);
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log(`Tarea borrada exitosamente`.green);
                    }
                }

                break;

            case '0': // Salir
                break;
        }

        guardarDB(tareas.listadoArray);
        
        if ( opt !== '0') await pausa();

        
    } while( opt !== '0');



};

main();