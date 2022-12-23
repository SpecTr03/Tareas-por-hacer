const colors = require('colors');
const inquirer = require('inquirer');

//Validaciones para el menu, aqui se usa el paquete inquirer el cual nos ayuda mucho con esta tarea.
//Gracias a este menu puedo utilizar los numeros del teclado para interactuar con la consola.
const menuOpts = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tareas`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }
];

const inquirerMenu = async() => {

    // console.clear();
    console.log('========================='.green);
    console.log(' Seleccione una opcion');
    console.log('=========================\n'.green);

    //Recibe las preguntas (menuOpts, el cual es un array) y las muestra en consola
    const { opcion } = await inquirer.prompt(menuOpts);

    return opcion;

}

const pausa = async() => {

    const { enter } = await inquirer.prompt([
        {
            type:'input',
            name: 'Enter',
            message: `\nPresione ${'ENTER'.green} para continuar\n`
        }
    ])

    return enter;
}

const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length ===0 ) {
                    return 'Porfavor ingrese un valor';
                }
                return true
            }
        }
    ]
    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async(tareas = []) => {
    const choices = tareas.map( (tarea, id) => {

        const idx = `${id + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'borrar',
            choices
        }
    ];

    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(mensaje) => {

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message: mensaje
        }
    ];

    const { ok } = await inquirer.prompt(pregunta);
    return ok;
}

const mostrarListadoCheckList = async(tareas = []) => {
    const choices = tareas.map( (tarea, id) => {

        const idx = `${id + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    })
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}