const {Router} = require('express');
const controlador = require('../controladores/index_controlador')
// const multer = require('multer');
const jwt = require('jsonwebtoken')
const path = require('path')
const router = Router();
 

router.post('/api/general/login', controlador.loginGeneral);
router.post('/api/general/register', controlador.register);
router.get('/api/general/getRoles',  controlador.getRoles);
router.get('/api/protegido',controlador.ensureToken, (req,res)=>{
    jwt.verify(req.token, 'my_secret_key', (err, data)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                ruta:'protegida',
                data:data
            })
        }
    })
    
})

router.get('/prueba', controlador.ensureToken, (req,res)=>{
    res.send('prueba!!')
})

module.exports = router;