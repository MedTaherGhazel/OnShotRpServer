import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose, { connection } from 'mongoose';
import  router  from './router';
// import mongoosePaginate from 'mongoose-paginate';


const app= express();

app.use(cors ({
  origin: 'http://localhost:4200',
    credentials:true,
}));

 app.use(compression());
 app.use(cookieParser());
 app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8088, ()=>{
    console.log('Server running on http://localhost:8088/')
});

const uriAtlas="mongodb+srv://med:med@cluster0.cg38vv7.mongodb.net/?retryWrites=true&w=majority";
const uriCompass="mongodb://localhost:27017/PRODUCT"
mongoose.Promise =Promise;
mongoose.connect(uriCompass);
mongoose.connection.on('error',(error:Error)=> console.log('hhhhhhhhhhhhhhhh nesi lmongo msaker ya bhim',error));

app.use('/', router())
