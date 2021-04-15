import './App.scss';


import { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'


//components
import LoginSignup from './components/authentication/LoginSignup'
import Home from './components/Home'

//redux
import { useSelector, useDispatch } from 'react-redux'

import * as constraints from './constraints'
import axios from 'axios';

//action
import * as actions from './redux/actions/actions'


function App() {
  const token = useSelector(state => state.token)
  const user = useSelector(state => state.user)

  console.log(user)
  
  const [isAuthen, setIsAuthen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      const route = constraints.server + '/authentication/loginByToken'
      axios.post(route, { token: token })
        .then(async res => {
          const result = await res.data
          if (result.status){
            dispatch(actions.setUser(result.user))
            setIsAuthen(true)

          }
        })
        .catch(err => {
         
        })
    }
    else{
      
      dispatch(actions.removeUser())
      setIsAuthen(false)
    }

  }, [token])
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path='/'
            render={() => isAuthen ? <Home user={user}></Home> : <Redirect to='/login-signup' />}
          />

          <Route
            path='/login-signup'
            render={() => !isAuthen ? <LoginSignup></LoginSignup> : <Redirect to='/' />}
          />

        </Switch>
        {/* <Redirect from='/' to='/login-signup' /> */}
      </BrowserRouter>
    </div>


  );
}

export default App;
