import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import express, { Express, NextFunction, Request, Response } from 'express'
import session from 'express-session'
import passport from 'passport'
import { v4 as uuidv4 } from 'uuid'
import pool from './config/mysqlConnPool'
import './auth/passportConfig'
import { router as xRoutes } from './controllers/CRUDControllers/XController'
import { router as xRoutesV2 } from './controllers/CRUDControllers/XV2Controller'
import { router as yRoutesV2 } from './controllers/CRUDControllers/YV2Controller'
import { router as zRoutesV2 } from './controllers/CRUDControllers/ZV2Controller'
import { router as authRoutesV2 } from './controllers/UIControllers/AuthV2Controller'
import { router as fileRoutesV2 } from './controllers/UIControllers/FileV2Controller'
import { router as fullXRoutesV2 } from './controllers/UIControllers/FullXV2Controller'
import { router as yWithXRoutesV2 } from './controllers/UIControllers/YWithXV2Controller'
import { router as xDetailWithXRoutesV2 } from './controllers/UIControllers/XDetailWithXV2Controller'
import { router as masterRoutesV2 } from './controllers/CRUDControllers/MasterV2Controller'
import { router as xDetailRoutesV2 } from './controllers/CRUDControllers/XDetailV2Controller'
import { router as MediaRoutesV2 } from './controllers/CRUDControllers/MediaV2Controller'
import { router as RoleRoutesV2 } from './controllers/CRUDControllers/RoleV2Controller'
import { router as PermissionRoutesV2 } from './controllers/CRUDControllers/PermissionV2Controller'
import { router as DefaultPermsRoutesV2 } from './controllers/CRUDControllers/DefaultPermsV2Controller'
import { router as RoleDefaultPermsRoutesV2 } from './controllers/UIControllers/RoleDefaultPermV2Controller'
import { sequelize } from './config/sequelizeConfig'
import { generateSecretKey } from './services/cryptoService'
import { SESSION_NAME } from './types/enums'
import logger from './config/winston-config'

dotenv.config()

// get environment values
const PORT: string = process.env.PORT ? process.env.PORT : '3000'
const CLIENT_PORT: string = process.env.CLIENT_PORT ? process.env.CLIENT_PORT : '5173'
const DB_HOST: string = process.env.DB_HOST ? process.env.DB_HOST : 'localhost'
const DB_USER: string = process.env.DB_USER ? process.env.DB_USER : 'root'
const DB_PASSWORD: string = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : 'admin123'
const DB_NAME: string = process.env.DB_NAME ? process.env.DB_NAME : 'schema_x'

const app: Express = express()

// error handling initialize
process.on('uncaughtException', (err: Error) => {
  logger.error(`Uncaught Exception: ${err.message}`, { error: err })
})

process.on('unhandledRejection', (reason: string, promise: Promise<unknown>) => {
  logger.error('Unhandled Rejection', { reason, promise })
})

//network initialize
app.all('/*', function (req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', [`http://localhost:${CLIENT_PORT}`])
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization,')
  res.header('Access-Control-Allow-Methods', 'POST')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//initialize static content serving
app.use(express.static('public'))

// authentication initialize
app.use(
  session({
    secret: generateSecretKey(),
    genid: function () {
      return uuidv4()
    },
    name: SESSION_NAME,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    store: new (require('express-mysql-session')(session))({
      createTableIfMissing: true,
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    }),
    cookie: {
      path: '/',
      secure: false,
      maxAge: 120 * 60 * 1000,
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())
app.use(passport.session())

// database initialize
export const connPool = pool
connPool.getConnection() // test connection

sequelize
  .sync()
  .then(() => {
    console.log('Database synced')
  })
  .catch((error: Error) => {
    console.error('Error syncing database:', error)
  })

// api initialize
app.use('/app/v1/x', xRoutes)
app.use('/app/v2/x', xRoutesV2)
app.use('/app/v2/z', zRoutesV2)
app.use('/app/v2/y', yRoutesV2)
app.use('/app/v2/auth', authRoutesV2)
app.use('/app/v2/file', fileRoutesV2)
app.use('/app/v2/fullX', fullXRoutesV2)
app.use('/app/v2/yWithX', yWithXRoutesV2)
app.use('/app/v2/xDetailWithX', xDetailWithXRoutesV2)
app.use('/app/v2/master', masterRoutesV2)
app.use('/app/v2/xDetail', xDetailRoutesV2)
app.use('/app/v2/media', MediaRoutesV2)
app.use('/app/v2/role', RoleRoutesV2)
app.use('/app/v2/permission', PermissionRoutesV2)
app.use('/app/v2/defaultperms', DefaultPermsRoutesV2)
app.use('/app/v2/roledefaultperms', RoleDefaultPermsRoutesV2)

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`)
})
