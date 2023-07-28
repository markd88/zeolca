

import {useNavigate,useLocation,useResolvedPath } from "react-router-dom";
import { Navigate ,Outlet } from 'react-router-dom'

import {checkRouterAuth} from './index'
import {useEffect,useState} from 'react'
const RouterBeforeEach = ()=>{
  const navigate = useNavigate()
  const location = useLocation()
  const [auth,setAuth] = useState(true)
  // useEffect(()=>{
  //   //let obj = checkRouterAuth(location.pathname)
  //   let obj = null
  //   let blLogin =sessionStorage.getItem('login')
  //   if(obj && obj.auth && blLogin=='false'){
  //     setAuth(false)
  //     navigate('/', {replace: true})
  //   }else{
  //     setAuth(true)
  //   }
  // },[])

  // useEffect(() => {
  //   navigate('/login')
  // },[])
  return (
    auth? (
    <Outlet/>
    ) : <Navigate to='/login'/>
  )
} 
 
export default RouterBeforeEach