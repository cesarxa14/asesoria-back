const jwt = require('jsonwebtoken');
const modelos = require('../modelos/index_modelo');

function ensureToken(req,res, next){
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !=='undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, 'my_secret_key', function(err, data){
            if(err){
                res.sendStatus(403);
            } else {
                next();
            }
        })
        
    } else{
        res.sendStatus(403);
    }
}

async function loginGeneral(req,res){
    try{
        // console.log(req.body.password)
        let usuario = req.body.usuario;
        let password = req.body.password;

        if(!usuario) throw { msj: 'Usuario inválido', status: 400};
        if(!password) throw { msj: 'Contraseña inválida', status: 400};
        let login = await modelos.login(usuario, password);
        console.log(login)
        if(login.status == 1){
            let obj = {
                status: login.status,
                msj   : login.msj
            }
            return res.send(obj);
        } else{
            const token = jwt.sign(req.body, 'my_secret_key', {expiresIn: 60 * 60 * 24 });
            console.log(token)
            let obj = {
                token: token,
                status: login.status,
                metadata: login.metadata
            }
            return res.status(200).send(obj);
        }
        

    } catch(err){

    }
}
async function register(req, res){
    try{
        console.log(req.body);
        res.send({hola:'hola'})
    } catch(err){

    }
}

async function getRoles(req, res){
    try{
        const roles = await modelos.getRoles();
        console.log(roles);
        return res.send(roles);
    } catch(err){

    }
    
}

module.exports = {
    loginGeneral,
    register,
    getRoles,
    ensureToken
}