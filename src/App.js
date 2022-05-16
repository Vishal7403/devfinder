import "./App.css";
import Item from "./Item";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {headers} from './headers'
import CircularProgress from '@mui/material/CircularProgress';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function App() {
  
  const [Query, setQuery] = useState("");
  const [Data, setData] = useState([]);
  const [Page, setPage] = useState(1);
  const [Limit, setLimit] = useState(0)
  const [Mode, setMode] = useState(true)
  const fetchData= async ()=>{
    
    const res = await fetch(
      `https://api.github.com/search/users?q=${Query}+in:email|in:users&per_page=20&page=${Page}`,{
        headers:headers
      }
    );
    const parsedRes = await res.json();
    let newData=Data.concat(parsedRes.items)
    function filterData(arr) {
      var unique = [];
      var newArr=[]
      arr.forEach(element => {
          if (!unique.includes(element.id)) {
              unique.push(element.id)
              newArr.push(element)
          }
      });
      return newArr;
  }
    setData(filterData(newData))
    setPage(Page => Page+1)
  }
  useEffect(() => {
    const func=async ()=>{
      const res = await fetch(
        `https://api.github.com/search/users?q=${Query}+in:email|in:users&per_page=20&page=1`,{
          headers:headers
        }
      );
      const parsedRes = await res.json();
      setLimit(parsedRes.total_count)
      setData(parsedRes.items)
      setPage(2)
    }
    if (Query.length > 0) {
      func()
    }
  }, [Query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const toggleMode=()=>{
    if(Mode){
      document.body.style.backgroundColor='rgb(0, 30, 60)'
      document.body.style.color='white'
    }else
    {
      document.body.style.backgroundColor='white'
      document.body.style.color='black'
    }
    setMode(!Mode)
  }
  return (
    <div className="container">
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:'20px'}}>
        <div style={{display:'flex',justifyContent:'space-between',width:'48%'}}>
        <h2>devfinder</h2>
        <button style={{backgroundColor:(Mode)?'white':'rgb(0, 30, 60)',color:(Mode)?'black':'white'}} onClick={toggleMode}>{!Mode?<LightModeIcon/>:<DarkModeIcon/>}{!Mode?'Light':'Dark'}</button>
        </div>
      <input value={Query} onChange={handleChange} placeholder="Enter Username or Email" />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {Query && Data.length>0  && <InfiniteScroll
          dataLength={Data.length} 
          next={fetchData}
          hasMore={Limit>Data.length}
          loader={<div style={{margin:'50%'}}><CircularProgress color={(Mode)?'primary':'warning'}/></div>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {Data &&
            Data.map((d) => {
              return <Item name={d.login} key={d.id}  mode={Mode}/>;
            })}
        </InfiniteScroll>}
      </div>
    </div>
  );
}

export default App;
