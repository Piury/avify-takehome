export const valueFormatter = (item: { value: number }) => {
  const value = item?.value ?? 0;
  return `${value}%`;
};

export const average = (item: { fuelTotals: number; totalIntervals:number }) => 
  (Math.round((item.fuelTotals / item.totalIntervals + Number.EPSILON) * 100) / 100);

  export const PieChartDataValueConverter = (_data : ApiResponse): PieChartProps => {
    const fuelTotals: Record<string, number> = {};
    _data.data.forEach(interval => {
      interval.generationmix.forEach(fuelData => {
        fuelTotals[fuelData.fuel] = (fuelTotals[fuelData.fuel] || 0) + fuelData.perc;
      });
    });
    const totalIntervals = _data.data.length;    
    
    const pieChartData: PieChartProps['data'] = Object.keys(fuelTotals).map(fuel => ({  
    color: GetColor(fuel),
    value: Math.round((fuelTotals[fuel] / totalIntervals + Number.EPSILON) * 100) / 100,    
    label: fuel
     }));  
return { data: pieChartData };
};


export const GetColor =(type : string): string => colors[type];

const colors = {
  biomass: 'green',
  coal: 'black',
  imports: 'blue',
  gas: 'orange',
  nuclear: 'purple',
  other: 'gray',
  hydro: 'lightblue',
  solar: 'yellow',
  wind: 'skyblue'
};

export const GetDaysOfMonth =(date)=>{
  const days = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  return Array.from({length: days}, (_, i) => i)
}

export const convertToLineChartProps = async (apiResponses: ApiResponse[]) => {
  const result: Map<string, LineChartProps> = new Map();
  let totalIntervalsLine =0;
  
  if (!apiResponses || apiResponses.length === 0) {
    return [];
  }
  
  for (const apiResponse of apiResponses) {
    const fuelTotalsLine: Record<string, number> = {};
    const value = apiResponse.data;
    totalIntervalsLine = value.length;
    if (value && value.length > 0) {
      value.forEach(interval => {
        interval.generationmix.forEach(fuelData => {
          fuelTotalsLine[fuelData.fuel] = (fuelTotalsLine[fuelData.fuel] || 0) + fuelData.perc;
        });
      });
    }
    await new Promise(resolve => setTimeout(resolve, 0));

  if (fuelTotalsLine && Object.keys(fuelTotalsLine).length > 0) {
    
    Object.keys(fuelTotalsLine).forEach(fuel => {
      const chartProps = {
        curve: 'natural',
        data: average({ fuelTotals: fuelTotalsLine[fuel], totalIntervals: totalIntervalsLine }),
        label: fuel,
        color: GetColor(fuel)
      };

      const existingData = result.get(fuel);
      if (existingData) {
        existingData.data.push(chartProps.data);
      } else {
        result.set(fuel, { ...chartProps, data: [chartProps.data] });
      }
    });
  }

  }


  

  const combinedProps = Array.from(result.values());
  return combinedProps;
};