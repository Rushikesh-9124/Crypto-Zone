import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import { FiArrowUpRight } from "react-icons/fi";
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const {setCurrency } = useContext(CoinContext)

    const currencyHandler = (e) => {
        switch(e.target.value) {
          case "usd" : {
            setCurrency({name:"usd", symbol : "$" })
            break;
          }
          case "inr" : {
            setCurrency({name:"inr", symbol : "₹" })
            break;
          }
          case "eur" : {
            setCurrency({name:"eur", symbol : "€" })
            break;
          }
          default : {
            setCurrency({name:"usd", symbol : "$" })
            break;
          }
          
        }
    }
  return (
    <div className='navbar'>
      <Link to={'/'}>
        <img src={logo} alt="" />
      </Link>
      <ul>
        {["Home", "Features", "Pricing", "Blog"].map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => setActiveIndex(index)}
              className={activeIndex === index ? "active" : ""}
            >
              {item === "Home" ? (
                <Link to={'/'} onClick={(e) => e.preventDefault()}>{item}</Link>
              ) : (
                item
              )}
            </li>
          );
        })}
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler}>
            <option value="usd">USD</option>
            <option value="inr">INR</option>
            <option value="eur">EUR</option>
        </select>
        <button className="button-hover"><p>Sign Up</p> <FiArrowUpRight className='signup-icon'/></button>
      </div>
    </div>
  )
}

export default Navbar

