// import express from 'express';
// const app = express();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
// const db = require ('./src/models');
import db from './src/models';
// import db from './webservices/src/models';

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening on porting ${port}`)
    })
})