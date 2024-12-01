import React, { useState, useEffect } from 'react';
import Api from './services/api';
import PieChart from './components/pieChart';
import PlineChart from './components/lineChart';
import {useFetchPieData,useFetchLineData} from './services/ApiResponses'

const App = () => {

  const { data, error, isLoading } = useFetchPieData();
  const  LineData= useFetchLineData(10,2024);

  return (
    <div>
      <h1>UK Energy Mix</h1>
      
      {isLoading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error fetching data: {error.message}</p>
      ) : data && data.length > 0 ? (
          <div>
            <div>
              <PieChart data={data}/>
            </div>
            <div>
              <PlineChart linedata={LineData}/>
            </div>
          </div>
          
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export {
    App
}