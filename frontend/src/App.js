import './App.css'

import { BrowserRouter as Router, Routes ,Route} from 'react-router-dom'
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Home from './components/Home';

import { Toaster } from "react-hot-toast"
import ProductDetails from './components/product/ProductDetails';
import Login from './components/auth/Login';
import Regiser from './components/auth/Regiser';
import Profile from './components/user/Profile';
import UserLayout from './components/layout/UserLayout';
import UpdateProfile from './components/user/UpdateProfile';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {

  return (
    <Router>
      <div className="App">
        <Toaster position="top-center"/>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/product/:id" element={<ProductDetails />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Regiser />}/>
            <Route path="/me/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
            <Route path="/me/update_profile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </ Router>
  );
}

export default App;
