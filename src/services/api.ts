import axios from 'axios';

class Api {
  private baseUrl = 'https://api.carbonintensity.org.uk';

  async getGenerationData(fromDate = new Date().toISOString().slice(0, 10)) {
    try {
      const response = await axios.get(`${this.baseUrl}/generation/${fromDate}/pt24h`);
      const apiData: ApiResponse = response.data;
      return apiData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Failed to fetch data');
    }
  }
  async getGenerationDataForMonth(month, year) {
  const endDate = new Date(year, month + 1, 0); 

  const dataForMonth = []; 

  const promises = [];
  for (let day = 1; day <= endDate.getDate(); day++) {
    const date = new Date(year, month, day);
    const formattedDate = date.toISOString().slice(0, 10);

    promises.push(
      (async () => {
        try {
          const response: ApiResponse = await axios.get(`${this.baseUrl}/generation/${formattedDate}/pt24h`);
          dataForMonth.push(response.data);
        } catch (error) {
          console.error(`Error fetching data for ${formattedDate}:`, error);
        }
      })()
    );
  }

  await Promise.all(promises);

  return dataForMonth;
}
}
export default new Api();

