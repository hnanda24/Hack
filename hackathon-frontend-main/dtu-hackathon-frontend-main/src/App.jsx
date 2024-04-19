import Navbar from "./components/Navbar"
import {Routes,Route} from 'react-router-dom'
import Login from "./screens/Login"
import SignUp from "./screens/SignUp"
import Landing from "./screens/Landing"
import Events from "./screens/Events"
import EventPage from "./screens/EventPage"
import ManageEvent from "./screens/ManageEvent"
import MyEvents from "./screens/MyEvents"
function App() {


  return (
   <>
    <Navbar/>
   <Routes>
    <Route path='/' element={<Landing/>}/>  
    <Route path='/my-events' element={<MyEvents/>}/>  
    <Route path='/manage-event/:id' element={<ManageEvent/>}/>  
    {/* <Route path='/add-event' element={<HostEvent/>}/>   */}
    <Route path='/events' element={<Events/>}/>  
    <Route path='/login' element={<Login/>}/>  
    <Route path='/sign-up' element={<SignUp/>}/>  
    <Route path='/sign-up' element={<SignUp/>}/>  
    <Route path='/event-page/:id' element={<EventPage/>}/>  
  </Routes></>
  )
}


export default App
