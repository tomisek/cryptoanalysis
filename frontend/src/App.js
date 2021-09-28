import React from 'react'
import { Routing } from './routes/Routing'
import { UserProvider } from './shared/global/provider/UserProvider'
import './shared/global/css/Global.css'
import {NavigationBar} from './components/NavigationBar/NavigationBar'


function App() {

  return (
    <UserProvider>
      
      <Routing>

        <NavigationBar/>
        

      </Routing>

    </UserProvider>

  );
}
export default App;
