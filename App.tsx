import React from 'react';
import "./App.css";
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { Home } from "./Pages/Home";
import { Doinglist } from "./Pages/DoingList";
import { Menu } from "./Pages/Menu"
import { Pagenotfound } from "./Pages/Pagenotfound";
import { Navbar } from "./Pages/Navbar";
import { Signup } from "./Pages/Signup";
import { useState , createContext } from "react";
import { Basic } from "./Pages/Basic";
import { Addacart } from "./Pages/Addcart";
import { PRO } from "./Pages/PRO";
import { VIP } from "./Pages/VIP";
import { Blog } from "./Blog/blog";
import { Blogposts } from "./Blog/Blogposts";

export const Appcontext = createContext({});



function App() {

  const [background1,setbackground1] = useState('rgb(230,230,230)');
  const [opacitymenu,setopacitymenu] = useState(1);

  return (
    <div className="App">
      <Appcontext.Provider value={{background1,setbackground1,opacitymenu,setopacitymenu}}>
        <Router>
          <Navbar background1={background1} setbackground1={setbackground1}/>
          <Routes>
            <Route path="/" element={<Home background1={background1} />} />
            <Route path="/doinglist" element={<Doinglist background1={background1} />} />
            <Route path="/menu" element={<Menu background1={background1}/>} />
            <Route path="*" element={<Pagenotfound background1={background1}/>} />
            <Route path="/SignUp" element={<Signup background1={background1} />} />
            <Route path="/Basic" element={<Basic background1={background1}/>} />
            <Route path="/Addacart" element={<Addacart background1={background1}/>}/>
            <Route path="/Pro" element={<PRO background1={background1}/>} />
            <Route path="/Vip" element={<VIP background1={background1}/>} />
            <Route path="/Blog" element={<Blog background1={background1}/>} />   
            <Route path="/Blogposts" element={<Blogposts background1={background1}/>} /> 
          </Routes> 
        </Router>
        
      </Appcontext.Provider>

    </div>
  );
}

export default App;
