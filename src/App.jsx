
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import { Toaster } from "react-hot-toast"
import Createtrip from "./pages/create_trip"
import { GoogleOAuthProvider } from "@react-oauth/google"
import ViewTrip from "./pages/view-trip"
import Mytrip from "./pages/my-trips/index"
function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>  
       <Router>
       
    <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/create-trip" element={<Createtrip/>} />
       <Route path="/view-trip/:tripid" element={<ViewTrip/>} />
       <Route path="/my-trips" element={<Mytrip/>} />
    </Routes>
    <Toaster/>  
    </Router>
    </GoogleOAuthProvider>
 
  )
}

export default App
