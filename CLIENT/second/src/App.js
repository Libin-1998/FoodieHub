import logo from './logo.svg';
import './App.css';
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

function App() {

  const logs=localStorage.getItem('isLogin')
  console.log(logs);

  const removes=()=>{
localStorage.removeItem('isLogin')
  }


  return (
    <>
    <Router>
        <div className='container-fluid navbar'>
        <img src={'/images/logo-food.png'} height={'70px'} width={'150px'}className='foodlog'></img>
        <ul className='nav'>
          <li>
            <Link to={"/"}>
            <a className='nav1' href=''>Home</a>
            </Link>
            </li>
         {/* <li>
          <Link to={"/howitworks"}>
          <a className='nav1' href='#'>How it works</a>
          </Link>
          </li> */}

         {/* <li>
          <Link to={"/features"}>
          <a className='nav1' href='#'> Features</a>
          </Link>
          </li> */}

         {/* <li>
         <Link to={"/cuisines"}>
          <a className='nav1' href='#'>Cuisines</a>
          </Link>
          </li> */}
        

          

          <li>
         <Link to={"/fastfood"}>
          <a className='nav1' href=''>Add FastFood</a>
          </Link>
          </li>

          <li>
         <Link to={"/food"}>
          <a className='nav1' href=''>FastFood</a>
          </Link>
          </li>

          <li>
            <Link to={'/addres'}>
              <a className='nav1' href=''>Add Restaurants</a>
            </Link>
          </li>

          <li>
            <Link to={'/restaurants'}>
              <a className='nav1' href=''>Restaurants</a>
            </Link>
          </li>


{logs=='true'?(
<>
<li>
<a className='nav1' href='' onClick={removes}>Logout</a>
</li>


</>
):(
  <>

<li>
         <Link to={"/login"}>
          <a className='nav1' href=''>Login</a>
          </Link>
          </li>
  
          <li>
         <Link to={"/signup"}>
          <a className='nav1' href=''>Signup</a>
          </Link>
          </li>
  </>
)

}
          
         
        </ul>
        </div>
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

        </Routes>
          <Footer/>
    </Router>
      
    </>
  );
}

export default App;
