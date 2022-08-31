import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import { router } from './routes/router.js'
import { connectDB } from './config/mongoose.js'
import cors from 'cors'


try {
  await connectDB()
  const app = express()
  app.use(helmet())
  app.use(cors())
  app.use(logger('dev'))
  app.use(express.json())

  app.use('/', router)


  app.use(function (err, req, res, next) {
    err.status = err.status || 500
   
     
   
    if (req.app.get('env') !== 'development') {
      return res
        .status(err.status)
        .json({
          status: err.status,
          message: err.message
        })
    }

    // Development only!
    // Only providing detailed error in development.
    return res
      .status(err.status)
      .json({
        status: err.status,
        message: err.message,
        cause: err.cause
          ? {
              status: err.cause.status,
              message: err.cause.message,
              stack: err.cause.stack
            }
          : null,
        stack: err.stack
      })
  })
  // app.use((req, res, next) => {
  //   res.header({"Access-Control-Allow-Origin": "*"});
  //   next();
  // }) 
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
} catch (err) {
  console.error(err)
  process.exitCode = 1
}
