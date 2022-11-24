import logo from './logo.svg';
import './App.css';
import Country from './components/countrywise/country';
import Cards from './components/cards/cards';
import { Graph } from './components/chart/mychart';
import { useState } from 'react';

function App() {
  
  let [record, SetRecord] = useState({});

  return (
    <div className="App">
     <Cards/>
     <Country  record={record} SetRecord={SetRecord}/>
    </div>
  );
}

export default App;
