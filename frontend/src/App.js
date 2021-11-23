import React from 'react'
import { Routing } from './routes/Routing'
import { UserProvider } from './shared/global/provider/UserProvider'
import './shared/global/css/Global.css'
import {NavigationBar} from './components/NavigationBar/NavigationBar'
import { Sidebar } from './components/Sidebar/Sidebar'
import { RegUserProvider } from './shared/global/provider/RegUserProvider'


function App() {

  return (
    <UserProvider>
      <RegUserProvider>
      
      <Routing>

        <NavigationBar/>
        
        <Sidebar />
        
      </Routing>
      
      </RegUserProvider>

    </UserProvider>

  );
}
export default App;
