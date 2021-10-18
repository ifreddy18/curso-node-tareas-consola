const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: '1. Crear tarea'
            },
            {
                value: '2',
                name: '2. Listar tareas'
            },
            {
                value: '3',
                name: '3. Listar tareas completadas'
            },
            {
                value: '4',
                name: '4. Listar tareas pendientes'
            },
            {
                value: '5',
                name: '5. Completar tarea(s)'
            },
            {
                value: '6',
                name: '6. Borrar tarea(s)'
            },
            {
                value: '0',
                name: '0. Salir'
            },
        ]
    }
];

const inquirerMenu = async() => {

    console.clear();
    console.log('============================'.green);
    console.log('   Seleccione una opción');
    console.log('============================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
};

const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'pausa',
            message: `Presione ${'ENTER'.green} para continuar`,
        }
    ];
    console.log('\n');

    await inquirer.prompt(question);
};

const leerInput = async(message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if ( value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
};

const listadoCompletarTarea = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, index) => {
        return {
            value: tarea.id,
            name: `${ index + 1 }. ${ tarea.desc }`,
            checked: tarea.completadoEn !== null ? true : false
        };
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(question);

    return ids;

};

const listadoBorrarTarea = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, index) => {
        return {
            value: tarea.id,
            name: `${ index + 1 }. ${ tarea.desc }`
        };
    });

    choices.unshift(
        {
            value: '0',
            name: '0. Cancelar y salir'
        }
    );

    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Que opcion desea borrar?',
            choices
        }
    ];

    const { id } = await inquirer.prompt(question);

    return id;

};

const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;

};

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoCompletarTarea,
    listadoBorrarTarea,
    confirmar
};