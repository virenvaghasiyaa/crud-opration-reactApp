import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-bootstrap';
import Login from './Components/Auth/login';
import Home from './Components/Home/home';
import { PublicRouting } from './Routes/PublicRouting';
import { PrivateRouting } from './Routes/PrivateRouting';
import Edit from './Components/Home/edit';


function App() {
  return (
    <>
      {/* <ToastContainer 
        position='bootom-right'
        autoclose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      /> */}

      <Routes>
        <Route element={<PublicRouting />} >
          <Route exact path={`/`} element={<Login />} />
        </Route>


        <Route element={<PrivateRouting />} >
          <Route exact path={`/home`} element={<Home />} />
        </Route>

        <Route element={<PrivateRouting />} >
          <Route exact path={`/user/:id`} element={<Edit />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
