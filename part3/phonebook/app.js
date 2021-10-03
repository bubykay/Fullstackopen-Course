require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var personsRouter = require('./routes/persons')

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

morgan.token('body', (req, res)=>{
  return (JSON.stringify(req.body))
})
app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body' ));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/persons', personsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
//   next
// });

const errorHandler = (err, req, res, next) => {
  // console.log(err)
  if(err.name==="CastError"){
    return res.status(400).send({ error: 'malformatted id' })
  }else if(err.name ==="ValidationError"){
    return res.send({
      success : 0,
      stack: err.stack,
      message: err.message
    })
  }else if(err.name==="invalidInput"){
    return res.send({
      success:0,
      message: err.message,
      status: 400
    })
  }else if(err.name==="personExist"){
    return res.send({
      success: 0,
      message: err.message,
      status: 409
    })
  }else if(err.name==="NotFoundError"){
    return res.status(400).json({
      message: err.message,
      reason: "check URL/contact the webmaster"
    })
  }else{
    const statusCode = err.status || 500
    return res.status(statusCode).json({
      success: 0,
      stack: err.stack,
      message: err.message
    });
  }
  
}

app.use(errorHandler)

module.exports = app;
