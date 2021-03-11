
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



// set routes for chat rooms

app.post("/room",(req,res)=>{
    const room=req.body.room
})



let users=[];
let messages=[];
let index=[];


io.on("connection",socket=>{

  socket.on('joinRoom',({username,room})=>{
      const user=userJoin(socket.id,username,room)

      console.log( users)

      socket.join(user.room)

      socket.emit('message',formatMessage("Admin", 'Welcome '))

      socket.broadcast.to(user.room).emit("message", formatMessage("Admin",`${user.username} has joined the chat`))

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
   

     io.to(user.room).emit('message',formatMessage(user.username, msg))
     
 })


})




/*io.on("connection",socket=>{

    
     
    socket.emit("loggedIn",{
        users: users.map(s=>s.username),
        messages:messages
        
    })
    



    //a user entered
    socket.on("newuser",username =>{
        console.log("enteredddd")
        console.log(`${username} has entered`)
        socket.username=username
        users.push(socket)
           // add every new user who entered
        io.emit("userOnline",socket.username)


    })

     socket.on('msg', msg=>{
         let message ={
             index:index,
             username:socket.username,
             msg:msg
         }

         messages.push(message)

         io.emit("msg",message)

         index++

     })








    //disconnect

    socket.on("disconnect",() =>{
        console.log(`${socket.username} has left`)

        io.emit("userLeft",socket.username)
        users.splice(users.indexOf(socket),1)

    })
})*/

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


//////////////////////// message object//////////////////

function formatMessage(username,text){
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }

    
   
}



http.listen(3001,()=>{
    console.log("listening on 3001")
})