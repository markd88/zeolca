import Login from '../pages/authentication/Login';
import Registration from '../pages/authentication/Register';
import LoginLayout from '../layout/LoginLayout'
import Recovery from '../pages/authentication/Password-recovery'
import Verification from '../pages/authentication/Verfication'

// 因为先注册的MainRoutes, 所以 跟路由 "/" 会被MainLayout 拦截

// Login 和 Registration 是用mui的template，其他的主要是antd
const LoginRoutes = {
  path: '/',
  element: <LoginLayout />,
  children: [
    {
      path: '/login',
      element: <Login/>,
    },
    {
      path: '/register',
      element: <Registration/>
    },
    {
      path: "/email-verification",
      element: <Verification/>
    },
    // {
    //   path: '/password-recovery',
    //   element: <Recovery/>
    // }
  ]
};

export default LoginRoutes;