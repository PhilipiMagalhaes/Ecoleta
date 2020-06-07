const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const db = require('./database/db');
const defaultImage= 'https://www.prefeitura.sp.gov.br/cidade/secretarias/upload/Reciclagem%20900x300.jpg';
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

nunjucks.configure('src/views', {
  express: app,
  noCache: true,
})

app.get('/', (request, response) => {
  response.render('index.html');
})
app.get('/novoponto', (request, response) => {
  response.render('create-point.html');
})
app.post('/novoponto', (request, response)=>{
  const { name, address, address2, ufName, cityName, items} = request.body;
  const query = `INSERT INTO places(
    image,
    name,
    address,
    address2,
    state,
    city,
    items) VALUES( ?, ?, ?, ?, ?, ?, ?
  );`;
  const values = [defaultImage, name, address, address2, ufName, cityName, items];
  db.run(query, values, response.send('Ok'));
  //db.run(query,values);
});
app.get('/resultados', (request, response) => {
  db.all(`SELECT * FROM places`, function (err, rows) {
    if (err)
      return console.log(err)

    return response.render('search-results.html', {
      places: rows,
      total: rows.length
    });
  });
});


app.listen(port, console.log(`Servidor iniciado na porta ${port}`));
