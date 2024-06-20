import{Routes, Route} from 'react-router-dom'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Dashboard from './pages/dashboard'
import Sendmoney from './pages/sendmoney'
import { toast, ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/sendmoney' element={<Sendmoney/>}/>
        </Routes>
        <ToastContainer/>
    </>
  )
}

export default App
