import React, { useEffect } from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getInfo } from './api';
import { setAllData } from './store/dataSlice';
import Card from './components/Cards';

function App() {
  const data = useSelector((state: any) => state.data.all)
  const dispatch = useDispatch();

  /*useEffect(() => {
    getInfo().then((data) => dispatch(setAllData(data)));
    // eslint-disable-next-line
  }, [])*/
  getInfo().then((response) => dispatch(setAllData(response)));

  return (
    <Card title={data[0].title} description={data[0].description} imageUrl={data[0].images[0]}/>
  );
}

export default App;
