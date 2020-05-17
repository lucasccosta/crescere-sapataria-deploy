const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt


const UserModel = require('./models/user');
const ObjectId = require('mongoose').ObjectId;

const secretKey = process.env.SECRET_KEY


// Estratégia local: Receber o POST de Login
passport.use(new LocalStrategy({
              usernameField: 'email',
              passwordField: 'password'  
            },
            async function (email, password, done){

              await UserModel.findOne({ email }, (err, user) => {
                
                // Done é chamada ao terminar o trabalho da passport
                // done(erro, usuário, mensagemParaUsuario)
                if(err){
                  return done(err)
                }
                
                // user == null
                if(!user){
                  // erro, usuário, mensagem
                  return done(null, false, {message: 'Email de usuário não existe!'})
                }
                // NESTE PONTO O EMAIL PASSADO PELO FORMULÁRIO É EXATAMENTE A UM EMAIL DO BANCO
                // User.passord - valor que ta salvo no banco
                // password - valor passado pelo formulário, no nosso caso postman
                user.compare(password, user.password)
                  .then(match => {
                    
                    if(!match){
                      return done(null, false, {message: 'Senha incorreta!'}) 
                    }
                    
                    return done(null, user);
                  })

              })
            }
          ))

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey
}
// Saber se o token do jwt é válido
passport.use(new JwtStrategy(opts, async(payload, done) => {
  await UserModel.findOne({ _id: payload._id}, (err, user) => {
    if(err){
      return done(err, false);
    }

    if(!user){
      return done(null, false);
    }

    return done(null, { id: user._id })
  })
}))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  await UserModel.findById({ _id: Object(id)}, (err, user) => {
    done(err, user)
  })
})

module.exports = passport