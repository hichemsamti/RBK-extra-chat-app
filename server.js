const app=require ("express")()

const http=require("http").Server(app)

const io= require("socket.io")(http)


let users=[];
let message=[];
let index=[];


io.on("connection",socket=>{


    socket.emit("loggedIn",{
        users: users.map(s=>s.username)

    })



    //a user entered
    socket.on("newuser",username =>{
        console.log(`${username} has entered`)
        socket.username=username
        users.push(socket)


    })








    //disconnect

    socket.on("disconnect",() =>{
        console.log(`${socket.username} has left`)

    })
})

http.listen(3001,()=>{
    console.log("listening on 3001")
})