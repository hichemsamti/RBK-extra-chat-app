import Router from "vue-router";
import Vue from "vue";

Vue.use(Router);






export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Login",
      component: () => import("../components/Login.vue"),
    },
    {
      path: "/signup",
      name: "Signup",
      component: () => import("../components/Signup.vue"),
     },
      {
       path: "/chat",
       name: "Chat",
       component:() =>import("../components/Chat.vue"),
     /*  beforeEnter:(to,from,next)=>{
         isUser(next)
       }*/
     }
     
    ]
    
});
