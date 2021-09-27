import React from 'react'
import Header from './components/Header'
import { LoginButton } from './components/LoginButton/LoginButton'
// import {Routing} from './routes/Routing'
import { UserProvider } from './shared/global/provider/UserProvider'
import './shared/global/css/Global.css'


function App() { 

  return (
    <UserProvider>
     
      <div className="App">
        <LoginButton />
        <Header />
        <h1>App.js</h1>
      </div>
     

    </UserProvider>

  );
}
export default App; 
