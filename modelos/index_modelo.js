function login(usuario, contraseña){
    return new Promise(async (resolve, reject)=>{
        let sql = 'SELECT public.__asesoria_1_login($1,$2) res'; //crear funcion de crear noticia en pgadmin
        sql = await global.pgp.as.format(sql,[usuario, contraseña]);
        console.log('sql->>>', sql);
        global.dbp.any(sql).then(res=>{
            console.log('fdsfd');
            return resolve(res[0].res);
        }).catch(err => {
            err.detalle = new Error().stack;
            return reject(err);
        });
    })

}

function getRoles(){
    return new Promise(async (resolve, reject)=>{
        let sql = 'SELECT * FROM rol'; //crear funcion de crear noticia en pgadmin
        sql = await global.pgp.as.format(sql);
        console.log('sql->>>', sql);
        global.dbp.any(sql).then(res=>{
            return resolve(res);
        }).catch(err => {
            err.detalle = new Error().stack;
            return reject(err);
        });
    })

}
module.exports = {
    login,
    getRoles
}