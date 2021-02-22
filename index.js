const express = require('express');
const app = express();
const db = require('./db/index_db');
const path = require('path');
const cors = require('cors');


app.use(cors());
db.connectDB();
app.set('port', process.env.PORT || 3000)
app.use(express.json())
app.use(require('./rutas/index_ruta'));
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
})