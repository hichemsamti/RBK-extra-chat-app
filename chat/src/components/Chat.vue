<template>
  <div id="app">
   <div class="chat-container">
    <header class="chat-header">
      <h1><i class="fas fa-smile"></i>{{username}} welcome to :{{room}} </h1>
      <router-link to="/" class="btn" >Quit</router-link>
    </header>
    <main class="chat-main">
      <div class="chat-sidebar">
        <h3><i class="fas fa-comments"></i> Room Name:</h3>
        <h2 id="room-name">{{room}}</h2>
      
        <div class="dropdown">
  <button class="dropbtn">Rooms</button><br>
  <input v-model="newRoom" type="text" placeholder= "create room" @change="createRoom"> 
  <div class="dropdown-content">
   <label for="room"></label>
          <select v-for="(createdRoom , index) in createdRooms" :key=index v-model="roomOption"  @change="changeRoom" >
            <option :value="createdRoom">{{createdRoom}}</option>
            
            
           </select> 
 
  </div>

 



  

</div>
 
        <h3><i class="fas fa-users"></i> Users</h3>
        <ul id="users" v-for="(user,index) in users" :key="index">
           <li>{{user.username}}</li>
        </ul>
      </div>
      
    </main>
    <Room :messages="messages" @sendMessage="this.sendMessage"  :room="this.roomOption"></Room>

  </div>

  </div>
</template>

<script>

import io from 'socket.io-client'
import Room from "./Room"
import axios from "axios"


export default {
  name: 'Chat',
  components: {
    
    Room,
  },
  data(){
    return{
      username:"",
      socket:io("localhost:3001"),
      messages:[],
      
      users:[],
      id:0,
      room:"welcome",
      roomOption:"welcome",
      createdRooms:["welcome","Room2","Room3"],
      newRoom:""
      

    }


  },

 

 async beforeMount(){
    
           this.id=document.cookie.split("=")[1]
           console.log(document.cookie)
           if(this.id !== undefined){
           const res= await axios.get("http://localhost:3001/auth/authentication/"+ this.id);
            
           this.username=res.data.username
           console.log(this.username)
            }
            else{
                    var resp= await axios.get("http://localhost:3001/auth/googlerender")
                    console.log(resp.data)
                    this.username=resp.data.username
                    console.log(this.username)
                    
                    

                }

                 this.joinServer()


                 

                 
            
    
 },


 
 



   
  

  
  methods:{


       createRoom(){
      
      this.socket.emit('room',this.newRoom)
      this.newRoom=""
      
     
    },

    changeRoom(){
            
     
                this.room=this.roomOption
                console.log(this.room)
                this.socket.emit('joinRoom', {username:this.username,room:this.room})
                console.log(this.username,this.room)
              
             
                
    },

    joinServer(){
      
    
    

    this.socket.emit('joinRoom', {username:this.username,room:this.room})
    console.log(this.username,this.room)

    
    
    this.listen()

    

   


     

    },

    

    listen(){
       this.socket.on('message', message =>{
       
       this.messages.push(message)
       console.log(this.messages)
       
     

    }),

       this.socket.on('roomUsers',({room, users})=>{
   
    console.log("all"+room + users)
    this.users=[...users]
    console.log(this.users)

}),

     this.socket.on('roomSend',room =>{
       this.createdRooms.push(room.room)
     })


    },


    

      sendMessage(text){
    this.socket.emit('chatMessage', text);
    console.log('hiiiiiiiiiii')
    },


    
      
    

    

    }

    
 

    
       

   
    

  

}

</script>

<style>
 @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');


 

:root {
	--dark-color-a: #667aff;
	--dark-color-b: #7386ff;
	--light-color: #e6e9ff;
	--success-color: #5cb85c;
	--error-color: #d9534f;
}

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

body {
	font-family: 'Roboto', sans-serif;
	font-size: 16px;
	background: var(--light-color);
	margin: 20px;
}

ul {
	list-style: none;
}

a {
	text-decoration: none;
}

.btn {
	cursor: pointer;
	padding: 5px 15px;
	background: var(--light-color);
	color: var(--dark-color-a);
	border: 0;
	font-size: 17px;
}

/* Chat Page */

.chat-container {
	max-width: 1100px;
	background: #fff;
	margin: 30px auto;
	overflow: hidden;
}

.chat-header {
	background: var(--dark-color-a);
	color: #fff;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	padding: 15px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.chat-main {
	display: grid;
	grid-template-columns: 1fr 3fr;
}

.chat-sidebar {
	background: var(--dark-color-b);
	color: #fff;
	padding: 20px 20px 60px;
	overflow-y: scroll;
  width:1070px
}

.chat-sidebar h2 {
	font-size: 20px;
	background: rgba(0, 0, 0, 0.1);
	padding: 10px;
	margin-bottom: 20px;
}

.chat-sidebar h3 {
	margin-bottom: 15px;
}

.chat-sidebar ul li {
	padding: 10px 0;
}

.chat-messages {
	padding: 30px;
	max-height: 500px;
	overflow-y: scroll;
}

.chat-messages .message {
	padding: 10px;
	margin-bottom: 15px;
	background-color: var(--light-color);
	border-radius: 5px;
}

.chat-messages .message .meta {
	font-size: 15px;
	font-weight: bold;
	color: var(--dark-color-b);
	opacity: 0.7;
	margin-bottom: 7px;
}

.chat-messages .message .meta span {
	color: #777;
}

.chat-form-container {
	padding: 20px 30px;
	background-color: var(--dark-color-a);
}

.chat-form-container form {
	display: flex;
}

.chat-form-container input[type='text'] {
	font-size: 16px;
	padding: 5px;
	height: 40px;
	flex: 1;
}

/* Join Page */
.join-container {
	max-width: 500px;
	margin: 80px auto;
	color: rgb(99, 37, 37);
}

.join-header {
	text-align: center;
	padding: 20px;
	background: var(--dark-color-a);
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
}

.join-main {
	padding: 30px 40px;
	background: var(--dark-color-b);
}

.join-main p {
	margin-bottom: 20px;
}

.join-main .form-control {
	margin-bottom: 20px;
}

.join-main label {
	display: block;
	margin-bottom: 5px;
}

.join-main input[type='text'] {
	font-size: 16px;
	padding: 5px;
	height: 40px;
	width: 100%;
}

.join-main select {
	font-size: 18px;
	padding: 5px;
	height: 40px;
	width: 100%;
}

.join-main .btn {
	margin-top: 20px;
	width: 100%;
}

@media (max-width: 700px) {
	.chat-main {
		display: block;
	}

	.chat-sidebar {
		display: none;
	}

}

.dropbtn {
  background-color: #774caf;
  color: rgb(255, 255, 255);
  padding: 16px;
  font-family: 'Roboto', sans-serif;
	font-size: 18px;
  border: none;
  cursor: pointer;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: relative;
  background-color:white;
  min-width: 85px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #f1f1f1}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #8e3e66;
}


</style>
