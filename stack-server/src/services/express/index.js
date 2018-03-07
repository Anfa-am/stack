import express from 'express'
import forceSSL from 'express-force-ssl'
import compression from 'compression'
import morgan from 'morgan'
import passport from 'passport'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { env } from '../../config'

export default (routes) => {
  const app = express()

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cookieSession({
    name: 'session',
    keys: ['putkeyshere'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))

  if (env === 'production') {
    app.set('forceSSLOptions', {
      enable301Redirects: false,
      trustXFPHeader: true
    })
    app.use(forceSSL)
  }

  if (env === 'production' || env === 'development') {
    app.use(compression())
    app.use(morgan('dev'))
  }

  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(routes)

  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())

  return app
}
