const colors = require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async() => {
    console.log('Hola mundo');

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareaFromArray( tareasDB );
    }

    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;

            case '2':
                tareas.listadoCompleto();
                break;

            case '3':
                tareas.listarTareasCompletadasIncompletas(true);
                break;
                
            case '4':
                tareas.listarTareasCompletadasIncompletas(false);
                break;
                
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);    
                tareas.toggleCompletadas(ids);
                break;

            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                const ok = await confirmar('Esta seguro?');
                if (ok) {
                    tareas.borrarTarea(id);
                    console.log('Tarea borrada')
                }
                console.log({ ok });
                break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');
}

main();