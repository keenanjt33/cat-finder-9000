const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const { cats } = require('./placeholder-data/cats.js');
const { images } = require('./placeholder-data/images.js');

const app = express();

app.set('port', process.env.PORT || 3001);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/search', async (req, res) => res.send(JSON.stringify(cats)));

app.get('/api/images', async (req, res) => res.send(JSON.stringify(images)));

app.get('/api/cat', async (req, res) => {
  const id = parseInt(req.query.catId, 10);
  if (id > cats.length || id < 0) return res.send(JSON.stringify({}));
  return res.send(JSON.stringify(cats[id - 1]));
});

app.get('/api/auth', (req, res, next) => {
  res.json({ authenticated: true });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});

module.exports = app;
