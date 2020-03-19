import React,{useRef,useContext} from 'react'
import { MachineContext} from 'state';
import { Redirect } from 'react-router-dom'

function Login(){
  const userRef = useRef();
  const passRef = useRef();
  const [machine,sendToMachine] = useContext(MachineContext)
  const  {error} = machine.context;

  const doLogin = (e) => {
    const username = userRef.current.value;
    const password = passRef.current.value;
    sendToMachine('LOGIN',{username,password})
  }

  return (
    <div>
      <h1>Login</h1>
      <div>
        <input type='text' placeholder='username' ref={userRef}/>
      </div>
      <div>
        <input type='password' placeholder='password' ref={passRef}/>
      </div>
      {machine.matches('auth.fail') && (
        <div>
          <div style={{color:'red'}}>
            {error.toString()}
          </div>
        </div>
      )}
      <div>
        <button onClick={doLogin}>Login</button>
      </div>
      {machine.matches('auth.success') && (
        <Redirect to='/'/>
      )}
    </div>
  )
}

export default Login;