import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react";
import './App.css' ;
import Logo from './weather.png' ;

function App() {
  const apikey="d8592fcca7cc1b0a43dbf1ab0011688c"
  const [name,setName]=useState("")
  const [data,setData]=useState({})
  const [slectedtbackColor,setselectedBackColor]=useState({backgroundImage: "linear-gradient(rgb(17, 13, 129),#60c2f0)"})

  const [backColor,setBackColor]=useState({backgroundImage: "linear-gradient( #60c2f0,rgb(17, 13, 129))"})
  const getwatherDetails=(cityname)=>{
    if(!cityname) return
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+apikey+"&units=metric"
    axios.get(url).then((res)=>{
      // setData(res.data)
      if(res.data.main?.temp >35){
        setData(res.data)
        console.log("background click")  
        setBackColor({backgroundImage: "linear-gradient(#ffbc03, #ff5303)"})
        setselectedBackColor({backgroundImage: "linear-gradient(#ff5303, #ffbc03)"})
      }
      if(res.data.main?.temp <35){
        setData(res.data)
        console.log("background click",res.data)
        setBackColor({backgroundImage: "linear-gradient( #60c2f0,rgb(17, 13, 129))"})
        setselectedBackColor({backgroundImage: "linear-gradient(rgb(17, 13, 129),#60c2f0)"})
      }

    }).catch((err)=>{
      console.log("error",err)
    })
    
    
  }
  const inputChange=(e)=>{
    setName(e.target.value)
  }
  const buttonclick=()=>{
    getwatherDetails(name)
    
  }
  return (
    <div className="col-md-12 " style={backColor}>
      <div className="weatherbg" >
        <h1 className="heading">Weather App</h1>
        <div className="d-grid gap-3 col-4 mt-4 search">
        <input type="text" className="form-control" value={name} onChange={inputChange} placeholder="Enter your Location"/>
       
        <button className="btn " type="button" onClick={buttonclick}>Search</button>
        </div>
        <div className="col-md-12 text-center mt-5">
      
      
        <div className="shadow rounded weatherResultBox" style={slectedtbackColor}>
      {
        Object.keys(data).length> 0 &&
        <div>
          <img className="weathericon" src={Logo} alt="weathericon"></img>
          <h6 className="weathercity">{data.name}</h6>
          <h6 className="weathertemp">{data.main?.temp}</h6>
          <h3 className="max"> Max {data.main?.temp_max}°C | Min {data.main?.temp_min}°C </h3>
          <h6 className="humidity">Humidity -: {data.main?.humidity}</h6>
          <h6 className="speed">Wind Speed  -: {data.wind?.speed} m/s</h6>
          </div>
}
</div>
      </div>
      </div>
      
    </div>
  );
}

export default App;
