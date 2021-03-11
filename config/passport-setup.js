const passport = require('passport')

const GoogleStrategy=require('passport-google-oauth20')

const keys = require("./keys")

const User=require("../models/user")

const jwt=require('jsonwebtoken')

passport.serializeUser((user,done)=>{
    console.log('serial')
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    console.log(id)
    User.findById(id).then((user)=>{
        done(null,user)
    })

})


passport.use(
    new GoogleStrategy ({

        callbackURL:"http://localhost:3001/auth/google/redirect",
        clientID:keys.google.clientID,
        clientSecret: keys.google.clientSecret

// options for the google strat

}, (accessToken,refreshToken,profile,done)=>{

     //passport callback function

     console.log('passport callback is fired')
    

     //check if user exists in db
     User.findOne({googleid:profile.id}).then((currentUser)=>{
         if(currentUser){
             

            
            console.log("current user" + currentUser)
            
     
             
             
               
            done(null,currentUser)

           
 
           
            //already is a user

         }else{
            new User({
                username:profile.displayName,
                googleid:profile.id
            }).save().then((newUser)=>{
                console.log('new user created:' + newUser)

                
         
                 
                
                done(null,newUser)

               
     
            })
             // not a user create a user
         }
     })


  
   


}
))


