import './App.scss';


import { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'


//components
import LoginSignup from './components/authentication/LoginSignup'
import Home from './components/Home'

//redux
import { useSelector } from 'react-redux'

import * as constraints from './constraints'
import axios from 'axios';


function App() {
  const token = useSelector(state => state.token)
  const [isAuthen, setIsAuthen] = useState(false)
  useEffect(() => {
    const route = constraints.server + '/authentication/loginByToken'
    axios.post(route, { token: token })
      .then(async res => {
        const result = await res.data
        if (result.status) setIsAuthen(true)
      })
      .catch(err => {

      })
  }, [token])
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path='/'
            render={() => isAuthen ? <Home></Home> : <Redirect to='/login-signup' />}
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
