<template>
 <div class="chat-form-container">
     <div class="chat-messages" v-for="(message,index) in messages" :key="index">
     <p  class="meta">{{message.username}} <span>{{message.time}}</span></p>
    <p  class="text">
       {{message.text}}
    </p>
    </div>
      <form id="chat-form" @submit="sendMessage">
        <input
          v-model="msg"
          id="msg"
          type="text"
          placeholder="Enter Message"
          required
          autocomplete="off"
        />
        <button class="btn" @click="sendMessage" :disabled="!msg"><i class="fas fa-paper-plane"></i> Send</button>
      </form>
    </div>




</template>


<script>

export default {

    name:"Room",
    props:["messages","room"],
    data(){
        return{
            msg:""

        }

    },

    methods:{
        sendMessage(){
            this.$emit("sendMessage", this.msg)
			console.log(this.msg)
            this.msg=""
        }
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
	color: #fff;
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
  color: white;
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
  background-color: #f9f9f9;
  min-width: 90px;
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