import logo from './logo.svg';
import {BrowserRouter as Router,Routes,Route, Link} from "react-router-dom";
import Home from './components/home/Home';
import Works from './components/works/Works';
import Features from './components/features/Features';
import Cuisines from './components/cuisines/Cuisines';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Fastfood from './components/fastfood/Fastfood';
import Addres from './components/addrestaurant/Addres';
import Viewrestaurant from './components/restaurants/Viewrestaurant';
import Viewfoods from './components/viewfastfoods/Viewfoods';
import Editfood from './components/editfood/Editfood';
import Editrestaurant from './components/editrestaurant/Editrestaurant';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar/Navbar';
import Cart from './components/cart/Cart';
import Searchpage from './components/searchpage/Searchpage';
import Profile from './components/profile/Profile';
import Editprofile from './components/editprofile/Editprofile';

function App() {

 


  return (
    <>
    <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route  path='/howitworks' element={<Works/>}/>
          <Route  path='/features' element={<Features/>}/>
          <Route  path='/cuisines' element={<Cuisines/>}/>
          <Route  path='/login' element={<Login/>}/>
          <Route  path='/signup' element={<Signup/>}/>
          <Route  path='/fastfood' element={<Fastfood/>}/>
          <Route  path='/addres' element={<Addres/>}/>
          <Route  path='/restaurants' element={<Viewrestaurant/>}/>
          <Route  path='/food' element={<Viewfoods/>}/>
          <Route  path='/editfood/:id' element={<Editfood/>}/>
          <Route  path='/editrestaurant/:id' element={<Editrestaurant/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/searchpage/:name' element={<Searchpage/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/editprofile/:id' element={<Editprofile/>}/>

        </Routes>
          <Footer/>
    </Router>
      
    </>
  );
}

export default App;
