import './App.css';
import {useState, useEffect} from 'react';


function App() {
  const [data, setData] = useState();
  const [BTC, setBTC] = useState(0);
  const getApiData = async () => {
    let resultas;
      const vieta = document.querySelector(".Text4");
      const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
      resultas = await response.json();
      setData(resultas);
      vieta.textContent = "Api data from: " + resultas.time.updated;
    }
    const updateBTC = e => {
      setBTC(e.target.value);
    }
  useEffect(() => {
      getApiData();
    }, []);
  useEffect(() => {
      if(data)
      {
        const EurVieta = document.querySelector(".CurrenciesEur");
        const UsdVieta = document.querySelector(".CurrenciesDollar");
        const GbpVieta = document.querySelector(".CurrenciesGBP");
        EurVieta.textContent = "€" + (parseFloat(BTC) * parseFloat(data.bpi.EUR.rate_float)).toLocaleString(undefined,{maximumFractionDigits:2});
        UsdVieta.textContent = "$" + (parseFloat(BTC) * parseFloat(data.bpi.USD.rate_float)).toLocaleString(undefined,{maximumFractionDigits:2});
        GbpVieta.textContent = "£" + (parseFloat(BTC) * parseFloat(data.bpi.GBP.rate_float)).toLocaleString(undefined,{maximumFractionDigits:2});
        console.log(data.bpi.EUR.rate);
      }
    }, [data, BTC]);

  return (
    <div className="App">
      <div className="Form">
        <div className = "Text1">BTC conversion to currencies</div>
        <label className="Text2" for="BTCValue">₿ Bitcoin: </label>
        <input onChange={updateBTC} id="BTCValue"></input>
        <div className="Currencies">
          <div className="CurrencySide">
            <div className="Text3">Eur: </div>
            <div className="CurrenciesEur"></div>
          </div>
          <div className="CurrencySide">
            <div className="Text3">Dollar: </div>
            <div className="CurrenciesDollar"></div>
          </div>
          <div className="CurrencySide">
            <div className="Text3">GBP: </div>
            <div className="CurrenciesGBP"></div>
          </div>
        </div>
        <div className="Text4"></div>
      </div>
    </div>
  );
}

export default App;
