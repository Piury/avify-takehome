import { convertToLineChartProps } from './Utilities';

describe('convertToLineChartProps', () => {
  it('should handle empty apiResponses', () => {
    const result = convertToLineChartProps([]);
    expect(result).toEqual([]);
  });

  it('should handle a single apiResponse with a single data point', () => {
    const apiResponses:ApiResponse[] = [
      {
        data: [
          {
            from: '2023-11-01T00:00:00Z',
            to: '2023-11-01T01:00:00Z',
            generationmix: [{ fuel: 'coal', perc: 50 }],
          },
        ],
      },
    ];

    const result = convertToLineChartProps(apiResponses);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      curve: 'natural',
      data: [{ fuelTotals: 50, totalIntervals: 1 }],
      label: 'coal',
    });
  });

  it('should handle multiple apiResponses with overlapping fuel types', () => {
    const apiResponses:ApiResponse[] = [
      {
        data: [
          {  
            from: '2023-11-01T00:00:00Z',
            to: '2023-11-01T01:00:00Z',
            generationmix: [{ fuel: 'coal', perc: 50 }, { fuel: 'gas', perc: 30 }] 
          },
        ],
      },
      {
        data: [
          {
            from: '2023-11-01T00:00:00Z',
            to: '2023-11-01T01:00:00Z',
            generationmix: [{ fuel: 'coal', perc: 40 }, { fuel: 'solar', perc: 20 }] 
          },
        ],
      },
    ];

    const result = convertToLineChartProps(apiResponses);
    expect(result).toHaveLength(3); // Expecting 3 fuel types: coal, gas, solar
  });

  it('should handle empty generationmix in data points', () => {
    const apiResponses:ApiResponse[] = [
      {
        data: [
          { 
            from: '',            
            to: '',
            generationmix: [] },
        ],
      },
    ];

    const result = convertToLineChartProps(apiResponses);
    expect(result).toEqual([]);
  });
});