import React from 'react'
import logo from './logo.svg'
import NavBar from './Navbar'
import Home from './Home'
import { Switch, BrowserRouter, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
