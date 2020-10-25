const express = require('express');
const path = require('path');
const nomeApp = process.env.npm_package_name;
const app = express();
const PÒRT = process.env.PORT || 8080;
 app.use(express.static(`${__dirname}/dist/${nomeApp}`));

 app.get('/*', (req, res) => {
   res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
 });

 app.listen(process.env.PORT || 80);
