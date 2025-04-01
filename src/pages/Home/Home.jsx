import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {
    const {allCoin, currency} = useContext(CoinContext)
    const [displayCoin, setDispalyCoin] = useState([])

    const [input, setInput] = useState(''); 

    const inputHandler = (e) => {
      setInput(e.target.value)
      if(e.target.value === ''){
        setDispalyCoin(allCoin)
      }
    }
    const searchHandler = async(event) => {
      event.preventDefault();

      const coins = await allCoin.filter((item) => {
        return (
          item.name.toLowerCase().includes(input.toLowerCase())
        )
      })
      setDispalyCoin(coins)

    }
    useEffect(()=>{
        setDispalyCoin(allCoin)
    },[allCoin])
  return (
    <div className='home'>
      <div className="hero">
        <h1>Largest <br /> Crypto Marketplace</h1>
        <p>Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
        <form onSubmit={searchHandler}>
            <input list='coin-list' value={input} type="text" placeholder='search crypto...' onChange={inputHandler} required/>

            <datalist id='coin-list'>
              {allCoin.map((item, index) => (
                <option key={index} value={item.name}/>
              ))}
            </datalist>
            <button type="submit">search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
            <p>#</p>
            <p>Coins</p>
            <p>Price</p>
            <p style={{textAlign:"center"}}>24H change</p>
            <p className='market-cap'>Market Cap</p>
            <p>24H Price Change</p>
        </div>
        {
            displayCoin.slice(0,20).map((item, index) => (
                <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                    <p>{item.market_cap_rank}</p>
                    <p><img src={item.image} alt="" /> {item.name}</p>
                    <p>{currency.symbol}{parseFloat(item.current_price.toFixed(5)).toString()}</p>
                    <p><span>High: <span>{currency.symbol}{item.high_24h}</span></span>
                    <span>Low: <span>{currency.symbol}{item.low_24h}</span></span></p>
                    <p>{currency.symbol}{item.market_cap.toLocaleString()}</p>
                    <p className={item.price_change_24h < 0 ? "negative" : ""}>{currency.symbol}{item.price_change_24h.toFixed(5)}</p>
                </Link>
            ))
        }
      </div>
    </div>
  )
}

export default Home
