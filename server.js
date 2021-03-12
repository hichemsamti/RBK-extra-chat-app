
const moment=require('moment')

const express=require("express")

const app = express()

const http=require("http").Server(app)

const io= require("socket.io")(http)




const authRoutes= require('./routes/user')



const passportSetup= require('./config/passport-setup')


//const cookieSession= require('cookie-session')

const mongoose=require('mongoose')

const keys=require("./config/keys")



var cors = require('cors')

const passport= require('passport')


const session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  
}))



app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-PINGOTHER"
    );
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS"
    );
    next();
  });

  app.use(cors())







//initialize passport

app.use(passport.initialize())
app.use(passport.session())

//connect to mongodb



mongoose.connect(keys.mongodb.dbURI,
    { useNewUrlParser: true,  
     useUnifiedTopology: true }, 
     err=>{
        if(err){
            console.log(err)
        }
        else{
            console.log('connected to DB')
        }
    })



//set up routes

app.use("/auth",authRoutes)







let users=[];



io.on("connection",socket=>{

  socket.on('joinRoom',({username,room})=>{
      const user=userJoin(socket.id,username,room)

      console.log( users)

      socket.join(user.room)

      socket.emit('message',formatMessage1("Admin", 'Welcome ',user.room))

      socket.broadcast.to(user.room).emit("message", formatMessage1("Admin",`${user.username} has joined the chat`,user.room))

      io.to(user.room).emit('roomUsers',{
        room:user.room,
        users:getRoomUsers(user.room)
    }) 
      

  })

  // get messages

  socket.on('chatMessage', msg =>{
      console.log(msg)
      console.log(socket.id)
    const user=getCurrentUser(socket.id)
    console.log(user)
   

     io.to(user.room).emit('message',formatMessage1(user.username, msg,user.room))
     
 })

 socket.on('room',room=>{
     console.log(room)
     const user=getCurrentUser(socket.id)

     io.to(user.room).emit("roomSend",{
         room
     })
 })


 socket.on('disconnect',()=>{
    const user = userLeave(socket.id)
    
    if(user){

    io.to(user.room).emit('message',formatMessage1("Admin",  ` ${user.username} user has left the chat`,user.room))

    //send users and room info

  io.to(user.room).emit('roomUsers',{
    room:user.room,
    users:getRoomUsers(user.room)
})


}




  


})
 


})






//////////////////////////// Join chat///////////////////////////////////
function userJoin(id,username,room){
    const user={id:id,username:username,room:room};
    console.log(user)
    users.push(user)

    return user
}


////////////////// get current user ///////////////////////////////
function getCurrentUser(id){
   var rt= users.filter(user =>{return user.id===id})
   var rt1=rt[0]
   return rt1
  
    
    
}


///////////////////////user leaves chat/////////////////////////////

function userLeave(id){
    const index=users.findIndex(user=>user.id===id)

    if(index !==-1){
        return users.splice(index,1)[0]

    }
}


//////////////////////get room users//////////////////////////////////



function getRoomUsers(room){
    return users.filter(user => user.room===room)

}




//////////////////////message object with room//////////

function formatMessage1(username,text,room){
    return {
        username,
        text,
        time: moment().format('h:mm a'),
        room
    }

    
   
}

http.listen(3001,()=>{
    console.log("listening on 3001")
})