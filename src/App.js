import logo from './logo.svg';
import './App.css';
import MapComponent from './MapComponent';
import DashBoard from './DashBoard';
import Municipal from './Components/Municipal';
import { Route, Routes } from 'react-router-dom';
import Analytics from './Components/Analytics';

function App() {
  return (
    <div className="App mx-auto" style={{padding:"20px"}}>
      <nav style={{ backgroundColor: '#333', padding: '1rem', color: '#fff', borderRadius: '5px' }}>
                <h1 style={{ display: 'inline', marginRight: '2rem' }}>Smart Overflow and Flood Monitoring</h1>
                <a href="/" style={{ color: '#fff', marginRight: '1rem' }}>Dashboard</a>
                <a href="/municipal" style={{ color: '#fff', marginRight: '1rem' }}>Municipal Record</a>
                <a href="/map" style={{ color: '#fff' ,marginRight: '1rem' }}>Map</a>
                <a href="/graph" style={{ color: '#fff' }}>Graphs</a>
      </nav>
      <Routes>
        <Route path='/municipal' Component={Municipal} />
        <Route path='/' Component={DashBoard}/>
        <Route path='/map' Component={MapComponent}/>
        <Route path='/graph' Component={Analytics}/>
      </Routes>

    </div>
  );
}

export default App;


/*{
  "mumbai":
  {
    "andheri":
    {
      citylat: "",
      citylong: "",
      redDotlat:[],
      redDotlong:[],
      floodlat:[],
      floodlong:[]
    },
    "colaba":
    {
      citylat: "",
      citylong: "",
      redDotlat:[],
      redDotlong:[],
      floodlat:[],
      floodlong:[]
    }

  }
}*/