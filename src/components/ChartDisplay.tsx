import * as React from 'react';
const ChartDisplay = ({ dataFetcher, children }) => {
  
  
  

  if (dataFetcher.getIsLoading()) {
    return <p>Cargando datos...</p>;
  }

  if (dataFetcher.getError()) {
    return <p>Error al cargar datos: {dataFetcher.getError().error.message}</p>;
  }
const result = dataFetcher.getData();
  if (result.data && result.data.length > 0) {
    return (
      <div>
        {children}
      </div>
    );
  }

  return <p>No hay datos disponibles.</p>;
};

export default ChartDisplay;