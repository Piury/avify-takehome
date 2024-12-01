import { PieChartDataValueConverter } from './Utilities'; 
import * as fs from 'fs';

describe('PieChartDataValueConverter', () => {
  let testData: ApiResponse;

  beforeEach(() => {
    const rawData = fs.readFileSync('src/services/Utilities/DataTest.json', 'utf8');
    testData = JSON.parse(rawData);
  });

  it('should convert API response to PieChartProps correctly', () => {
    const pieChartData = PieChartDataValueConverter(testData);

    // Assert expected properties of PieChartProps
    expect(pieChartData).toHaveProperty('data');
    expect(pieChartData.data).toBeInstanceOf(Array);

    // Check data shape (adjust based on your PieChartProps interface)
    pieChartData.data.forEach(dataPoint => {
      expect(dataPoint).toHaveProperty('color');
      expect(typeof dataPoint.color).toBe('string');

      expect(dataPoint).toHaveProperty('value');
      expect(typeof dataPoint.value).toBe('number');
      expect(dataPoint.value).toBeGreaterThanOrEqual(0);
      expect(dataPoint.value).toBeLessThanOrEqual(100);

      expect(dataPoint).toHaveProperty('label');
      expect(typeof dataPoint.label).toBe('string');
    });
  });
});