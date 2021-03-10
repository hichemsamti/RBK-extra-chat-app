const app=require ("express")()

const http=require("http").Server(app)

const io= require("socket.io")(http)


let users=[];
let messages=[];
let index=[];


io.on("connection",socket=>{

     
    socket.emit("loggedIn",{
        users: users.map(s=>s.username),
        messages:messages

    })



    //a user entered
    socket.on("newuser",username =>{
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
})

http.listen(3001,()=>{
    console.log("listening on 3001")
})