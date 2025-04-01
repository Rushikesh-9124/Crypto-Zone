import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext'
import LineChart from '../../components/LineChart/LineChart'

const Coin = () => {
  const {coinId} = useParams()
  const [coinData, setCoinData] = useState()
  const {currency} = useContext(CoinContext)
  const [historicalData, setHistoricalData] = useState()
  const [days, setDays] = useState(365)

  console.log(days)
  

  // const ChangeDate = (e) => {
  //   e.preventDefault();
  //   const newDays = parseInt(e.target.elements.days.value);
  //   if (!isNaN(newDays) && newDays > 0) {
  //     setDays(newDays);
  //   }
  //   console.log(days)
  // }

  const fetchCoinData = async() => {
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(res => res.json())
      .then(res => setCoinData(res))
      .catch(err => console.error(err));
      
  }
  const fetchHistoricalData = async() => {
    if (!coinId || !currency?.name) return;
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=365&interval=daily`, options)
      .then(res => res.json())
      .then(res => setHistoricalData(res))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [coinData, currency, coinId, days])

  if(coinData && historicalData){
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={coinData.image.large} alt="" />
          <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
        </div>
        <div className="coin-chart">
          <LineChart historicalData={historicalData}/>
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>{currency.symbol}{coinData.market_data?.current_price?.[currency.name.toLowerCase()].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>{currency.symbol}{coinData.market_data?.market_cap?.[currency.name.toLowerCase()].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24H High</li>
            <li>
              {currency.symbol}
              {coinData.market_data?.high_24h?.[currency.name.toLowerCase()]?.toLocaleString() || "N/A"}
            </li>
          </ul>
          <ul>
            <li>24H Low</li>
            <li>
              {currency.symbol}
              {coinData.market_data?.low_24h?.[currency.name.toLowerCase()]?.toLocaleString() || "N/A"}
            </li>
          </ul>
            <ul>
            <li>All Time High (ATH)</li>
            <li>
              {currency.symbol}
              {coinData.market_data?.ath?.[currency.name.toLowerCase()] 
                ? coinData.market_data.ath[currency.name.toLowerCase()].toLocaleString() 
                : "N/A"}
            </li>
            </ul>
          <ul>
            <li>All Time Low (ATL)</li>
              <li>
                {currency.symbol}
                {coinData.market_data?.atl?.[currency.name.toLowerCase()] 
                  ? coinData.market_data.atl[currency.name.toLowerCase()].toLocaleString() 
                  : "N/A"}
            </li>
          </ul>
          <ul>
            <li>Last Updated</li>
            <li>{coinData.last_updated ? new Date(coinData.last_updated).toLocaleString() : "N/A"}</li>
          </ul>
        </div>
      </div>
    )
  }else{
    return(
      <div className="spinner">
        <div className="spin">
          
        </div>
      </div>
    )
  }
}

export default Coin
