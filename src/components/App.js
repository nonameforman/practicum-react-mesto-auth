import React, {useState, useEffect} from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Footer from './Footer.js';
import Content from './Content.js';
import Register from './Register.js';
import Login from './Login.js';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth.js';

function App() {

  const [loggedIn, setloggedIn] = useState(false);

  const history = useHistory();

  const [email, setEmail] = useState('');

  const handleLogin = () => {
    setloggedIn(true)
  }

  const tokenCheck = () => {
    const token = localStorage.getItem('token')
    if (token) {
      auth.getInfo(token).then((res) => {
        if (res) {
          setloggedIn(true)
          history.push('/content')
          setEmail(res.data.email)
        }
      }).catch((err) => {
        setloggedIn(false)
        console.error(err)
      })
    }
  }

  const signOut = () => {
    localStorage.removeItem('token');
}

  useEffect(() => {
    tokenCheck()
  }, [tokenCheck]);

  return (
      <div className="page">
          <Header loggedIn={loggedIn} signOut={signOut} email={email} />
          <Switch>
            <ProtectedRoute exact path="/" component={Content} loggedIn={loggedIn} />
            <Route path="/sign-up">
              <Register />
            </Route>
            <Route path="/sign-in">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path="*">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
      </div>
  ); 
}

export default App;