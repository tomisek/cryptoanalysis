import React from 'react'
import { Routing } from './routes/Routing'
import { UserProvider } from './shared/global/provider/UserProvider'
import './shared/global/css/Global.css'
import {NavigationBar} from './components/NavigationBar/NavigationBar'
import { Sidebar } from './components/Sidebar/Sidebar'


function App() {

  return (
    <UserProvider>
      
      <Routing>

        <NavigationBar/>
        
        <Sidebar />
        
      </Routing>

    </UserProvider>

  );
}
export default App;
