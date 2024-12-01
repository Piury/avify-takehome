import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { PieChartDataValueConverter, valueFormatter } from '../services/Utilities/Utilities';

export default function PieArcLabel(data: ApiResponse) {
   const processedData = PieChartDataValueConverter(data);
    return (      
      <PieChart
        colors={['red', 'blue', 'green']}
        series={[
          {
            arcLabel: (item) => `${item.value}%`,
            arcLabelMinAngle: 35,
            arcLabelRadius: '60%',
            ...processedData,
            valueFormatter
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: 'bold',
          },
        }}
        {...size}
      />
      
    );
}

const size = {
  width: 800,
  height: 600,
};
