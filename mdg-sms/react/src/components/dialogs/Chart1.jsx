import { useEffect, useState } from 'react';
import * as echarts from 'echarts/core';
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
// import axiosClient from '../../axios-client';

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  BarChart,
  CanvasRenderer,
  UniversalTransition
]);

const recentSchoolYearMapping = {
  ay_2019_2020_1st_term: "AY 2019-2020 | 1st Term",
  ay_2019_2020_2nd_term: "AY 2019-2020 | 2nd Term",
  ay_2019_2020_3rd_term: "AY 2019-2020 | 3rd Term",
  ay_2020_2021_1st_term: "AY 2020-2021 | 1st Term",
  ay_2020_2021_2nd_term: "AY 2020-2021 | 2nd Term",
  ay_2020_2021_3rd_term: "AY 2020-2021 | 3rd Term",
  ay_2021_2022_1st_term: "AY 2021-2022 | 1st Term",
  ay_2021_2022_2nd_term: "AY 2021-2022 | 2nd Term",
  ay_2021_2022_3rd_term: "AY 2021-2022 | 3rd Term",
  ay_2022_2023_1st_term: "AY 2022-2023 | 1st Term",
  ay_2022_2023_2nd_term: "AY 2022-2023 | 2nd Term",
  ay_2022_2023_3rd_term: "AY 2022-2023 | 3rd Term",
  ay_2023_2024_1st_term: "AY 2023-2024 | 1st Term",
  ay_2023_2024_2nd_term: "AY 2023-2024 | 2nd Term",
  ay_2023_2024_3rd_term: "AY 2023-2024 | 3rd Term",
  ay_2024_2025_1st_term: "AY 2024-2025 | 1st Term",
  ay_2024_2025_2nd_term: "AY 2024-2025 | 2nd Term",
};

const Chart1 = () => {
  const [scholars, setScholars] = useState([]);

  useEffect(() => {
    generateDummyData();
  }, []);

  const generateDummyData = () => {
    const dummyData = Object.keys(recentSchoolYearMapping).map(key => ({
      mostRecentSchoolYearAttended: recentSchoolYearMapping[key],
      active: Math.floor(Math.random() * 100),
      inactive: Math.floor(Math.random() * 100)
    }));
    setScholars(dummyData);
  };

  useEffect(() => {
    if (!Array.isArray(scholars) || scholars.length === 0) return;

    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;

    const xAxisData = scholars.map(item => item.mostRecentSchoolYearAttended);
    const activeData = scholars.map(item => item.active);
    const inactiveData = scholars.map(item => item.inactive);

    const formattedXAxisData = xAxisData.map(label => {
      const [year, term] = label.split(' | ');
      return `{year|${year}}\n{term|${term}}`;
    });

    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        },
        formatter: function (params) {
          const label = params[0].axisValue.replace(/\{year\|(.+?)\}\n\{term\|(.+?)\}/, '$1 | $2');
          return `${label}<br/>${params.map(p => `${p.marker} ${p.seriesName}: ${p.value}`).join('<br/>')}`;
        }
      },
      toolbox: {
        feature: {
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['Active', 'Inactive']
      },
      dataZoom: [
        {
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          start: 80, // Adjusted to show the 5 most recent academic years
          end: 100
        },
        {
          type: 'inside',
          xAxisIndex: [0],
          start: 80, // Adjusted to show the 5 most recent academic years
          end: 100
        }
      ],
      xAxis: [
        {
          type: 'category',
          data: formattedXAxisData,
          axisPointer: {
            type: 'shadow'
          },
          axisLabel: {
            interval: 0, // Show all labels
            rotate: 0, // No rotation
            rich: {
              year: {
                fontWeight: 'bold',
                align: 'center'
              },
              term: {
                align: 'center'
              }
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Number of Active Students',
          min: 0,
          axisLabel: {
            formatter: '{value}'
          }
        }
      ],
      series: [
        {
          name: 'Active',
          type: 'bar',
          itemStyle: {
            color: '#0F2554'
          },
          tooltip: {
            valueFormatter: function (value) {
              return value;
            }
          },
          data: activeData
        },
        {
          name: 'Inactive',
          type: 'bar',
          itemStyle: {
            color: '#d80000'
          },
          tooltip: {
            valueFormatter: function (value) {
              return value;
            }
          },
          data: inactiveData
        }
      ],
      grid: {
        containLabel: true
      } 
    };

    option && myChart.setOption(option);
  }, [scholars]);

  return <div id="main" className='py-4 px-4' style={{ width: '100%', height: '400px' }}></div>;
};

export default Chart1;