import logo from './logo.svg';
import './App.css';
import MapComponent from './MapComponent';
import DashBoard from './DashBoard';

function App() {
  return (
    <div className="App mx-auto">
      <DashBoard/>
      <h1>Flood Maps</h1>
      <MapComponent />
      
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