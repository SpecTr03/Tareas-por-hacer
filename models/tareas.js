const Tarea = require('./tarea')

class Tareas {
    _listado = {
        'abc':123
    };

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        })

        return listado;
    }

    constructor () {
        this._listado = {};
    }

    crearTarea( desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareaFromArray ( tareas = []) {
        tareas.forEach ( tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    listadoCompleto() {
        this.listadoArr.forEach( (tarea, id) => {

            const idx = `${id + 1}`.green;
            const {desc,completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${idx} ${ desc } :: ${estado}`);
        })
    }

    listarTareasCompletadasIncompletas (completadas) {
        let contador = 0;
        this.listadoArr.forEach ( tarea => {
            const {desc,completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            if (completadas) {

                if (completadoEn) {
                    contador += 1;
                    console.log(`${contador.toString().green}. ${ desc } :: ${completadoEn.green}`);
                }
            } else  {
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${contador.toString().green}. ${ desc } :: ${estado}`);
                }
            }

        })
    }

    borrarTarea( id = '' ) {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    toggleCompletadas(ids=[]) {
        ids.forEach( id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach( tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;