const { rejects } = require('assert');
const colors = require('colors');
const { resolve } = require('path');

//Creacion del menu
const mostrarMenu =() => {

    return new Promise(resolve => {
        console.clear();
    
        console.log('========================='.green);
        console.log(' Seleccione una opcion'.green);
        console.log('=========================\n'.green);

        console.log(`${'1.'.green} Crear una tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tareas`);
        console.log(`${'6.'.green} Borrar una tarea`);
        console.log(`${'0.'.green} Salir\n`);

        //Mostrando y recibiendo informacion del usuario
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        //Mostrando informacion con una pregunta
        readline.question('Seleccione una opcion: ', (opt) => {
            readline.close();
            resolve(opt);
        })
    });

    
}

const pausa = () => {

    return new Promise( resolve => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${'ENTER'.green} para continuar\n`, (opt) => {
            readline.close();
            resolve();
        })
    })
    
}

module.exports = {
    mostrarMenu,
    pausa
}