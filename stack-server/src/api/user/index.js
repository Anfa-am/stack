import passport from 'passport'
import { middleware as body } from 'bodymen'
import { middleware as query } from 'querymen'
import User, { schema } from './model'
import { Router } from 'express'

export User, { schema } from './model'

const router = new Router()

router.get('/google', passport.authenticate('google'), (req, res) => {
  res.redirect('http://theindx.io/')
  res.json(req.user)
})

router.get('/watching', (req, res) => {
  if (req.user){
    res.send({ watching: req.user.watchList });
  }else{
    res.send({ authenticated: false });
  }
})

router.post('/watch', (req, res) => {
  if (req.user){
    User.findById(req.user.id).then(function (doc){
      if(doc.watchList.indexOf(req.body.watching) === -1) {
        doc.watchList.push(req.body.watching)
        doc.save();
      }
      res.send({ watching: doc.watchList });
    })
  }else{
    res.send({ watching: [] });
  }
})

router.post('/unwatch', (req, res) => {
  if (req.user){
    User.findById(req.user.id).then(function (doc){
      if(doc.watchList.indexOf(req.body.watching) !== -1) {
        doc.watchList.splice(doc.watchList.indexOf(req.body.watching), 1)
        doc.save();
      }
      res.send({ watching: doc.watchList });
    })
  }else{
    res.send({ watching: [] });
  }
})

router.get('/me', (req, res) => {
  if (req.user){
    res.send({ name: req.user.name, authenticated: true  });
  }else{
    res.send({ authenticated: false });
  }
})

router.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }))

export default router
