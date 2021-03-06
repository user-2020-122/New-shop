import Vue from 'vue'
import VueRouter from 'vue-router'
//路由懒加载
import Login from "../views/LandingPage/Login";
const home=()=>import('../views/home/home')
const Welcome=()=>import('../views/home/homeChild/Welcome')
const user =()=>import('../views/home/homeChild/User/User')
const roles =()=>import('../views/power/roles')
const rights=()=>import('../views/power/Rights')
const categories=()=>import('../views/cate/categories')
const params=()=>import('../views/params/params')
const goods=()=>import('../views/goods/Goods')
const add=()=>import('../views/goods/Add')
const order=()=>import('../views/order/order')
const reports=()=>import('../views/reports/reports')
Vue.use(VueRouter)

const routes = [
    //重定向路由
  {
    path:'',
    redirect:'/login'
  },
  {
   path:'/login',
   component:Login
  },
  {
    path:'/home',
    component:home,
    //url是/home，就重定向到/Welcome页面 这个页面是我们的子路由
    redirect: '/Welcome',
    // //子路由，如果path:'/home'，就重定向到子路由/Welcome
    children:[
      {path:'/Welcome', component:Welcome},
      //这个地址就是打开router跳转的地址
      {path:'/users', component:user},
      {path:'/roles',component:roles},
      {path:'/rights',component:rights},
      {path: '/categories',component:categories},
      {path:'/params',component:params},
      {path:'/goods',component:goods},
      {path: '/goods/add',component:add},
      {path:'/orders', component:order},
      {path:'/reports',component:reports}
      ]
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//路由导航守卫
router.beforeEach((to,form,next)=>{
  //判断是不是登录页,是就进入
  if (to.path==='/login') return next();
  const tokenStr = window.sessionStorage.getItem("token");
   if (tokenStr===null){
     return  next('/login')
   }
   //这句必须要加
   next();
})
//导出
export default router
