import React, {useState, useEffect} from 'react'
import APIService from './APIService'
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Login() {

    const [username,  setUsername] = useState('')
    const [password,  setPassword] = useState('')
    const [token, setToken] = useCookies(['mytoken'])
    const [isLogin, setIsLogin] = useState(true)

    let history = useNavigate()

    useEffect(() => {
      if(token['mytoken']){
        history('/articles')
      }
    }, [token])
    

const loginBtn = () =>{
  APIService.LoginUser({username, password})
  .then(resp => setToken('mytoken', resp.token))
  .catch(error => console.log(error))
}

const registerBtn = () =>{
  APIService.RegisterUser({username, password})
  .then(resp => loginBtn())
  .catch(error => console.log(error))
}
 
  return (
    <div className='App'>
      {isLogin ? <h2>Login now!</h2> : <h2>Register now!</h2>}
    
     <div className="mb-3 mt-5">
        <label htmlFor="username" className='form-label'>Username</label>
        <input type="text" className='form-control' id='username' placeholder='please enter username' 
        value={username} onChange={e => setUsername(e.target.value)}/>
     </div>

     <div className="mb-3">
        <label htmlFor="password" className='form-label'>Password</label>
        <input type="password" className='form-control' id='password' placeholder='please enter username'
        value={password} onChange={e => setPassword(e.target.value)} />
     </div>

     {isLogin ? <button type="submit" className='btn btn-primary' onClick={loginBtn}>Login</button> :
     <button type="submit" className='btn btn-primary' onClick={registerBtn}>Register</button>}

    {isLogin ? <h5>If you don't have an account, Please 
      <button className='btn btn-primary' onClick={() => setIsLogin(false)}>Register</button> here</h5>
      : <h5>If you have an account, Please 
      <button className='btn btn-primary' onClick={() => setIsLogin(true)}>Login</button> here</h5>}

    </div>
  )
}

export default Login
