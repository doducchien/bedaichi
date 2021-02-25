import './App.scss';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import LoginSignup from './components/authentication/LoginSignup'
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route path='/login-signup' component={LoginSignup} />

        </Switch>
        <Redirect from='/' to='/login-signup' />
      </BrowserRouter>
    </div>


  );
}

export default App;
