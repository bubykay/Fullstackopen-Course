const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
  }


const errorHandler = (err, req, res, next) => {
    // console.log(err)
    if(err.name==='CastError'){
      return res.status(400).send({ error: 'malformatted id' })
    }else if(err.name ==='ValidationError'){
      return res.send({
        success : 0,
        stack: err.stack,
        message: err.message
      })
    }else if(err.name==='invalidInput'){
      return res.send({
        success:0,
        message: err.message,
        status: 400
      })
    }else if(err.name==='personExist'){
      return res.send({
        success: 0,
        message: err.message,
        status: 409
      })
    }else if(err.name==='NotFoundError'){
      return res.status(400).json({
        message: err.message,
        reason: 'check URL/contact the webmaster'
      })
    }else{
      const statusCode = err.status || 500
      return res.status(statusCode).json({
        success: 0,
        stack: err.stack,
        message: err.message
      })
    }
  }

  module.exports = {errorHandler, requestLogger}