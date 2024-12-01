import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { GetDaysOfMonth, convertToLineChartProps } from '../services/Utilities/Utilities';

export default function PlineChart(linedata) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultlinedata = await convertToLineChartProps(linedata.linedata.data);
        setData(resultlinedata);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [linedata]); 

  const xAxis = [{ data: GetDaysOfMonth(new Date(Date.now())) }];
console.log(data);
  return (
    <LineChart
      xAxis={xAxis}
      series={data.length > 0 ? data : []}
      //  series={data}
      height={300}
      margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
      grid={{ vertical: true, horizontal: true }}
    />
  );
}
