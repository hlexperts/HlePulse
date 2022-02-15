import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import SigV4 from "@hlexperts/sigv4";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);
  
    const asyncFetch = () => {
      fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
        .then((response) => response.json())
        .then((json) => {
         const datas = [
          {
            "Week Number":"Week 38 (From 13\/12\/2021 To 19\/12\/2021 )",
            "category":"Lead",
            "value":304
          },
          {
              "Week Number":"Week 39 (From 06\/12\/2021 To 12\/12\/2021 )",
              "category":"Submissions",
              "value":385
          }
         ];
            setData(datas)
        })
        .catch((error) => {
          console.log('fetch data failed', error);
        });
    };
    const config = {
      data: data.filter((item) => item.category === 'Lead' || item.category === 'Submissions'),
      xField: 'Week Number',
      yField: 'category',
      seriesField: 'value',
      color: ['pink', 'black'],
      label: {
        layout: [
          {
            type: 'hide-overlap',
          },
        ],
        style: {
          textAlign: 'right',
        },
        formatter: (item) => item.value,
      },
      point: {
        size: 5,
        style: {
          lineWidth: 1,
          fillOpacity: 1,
        },
        shape: (item) => {
          if (item.category === 'Cement production') {
            return 'circle';
          }
  
          return 'diamond';
        },
      },
      annotations: [
        {
          type: 'line',
          start: ['0%', '10%'],
          end: ['100%', '10%'],
          top: true,
          style: {
            stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
            lineWidth: 2,
          },
        }, 
        {
          type: 'region',
          start: ['0%', '0%'],
          end: ['20%', '10%'],
          top: true,
          style: {
            fill: '#1890ff',
            fillOpacity: 1,
            opacity: 1,
          },
        }, 
        {
          type: 'text',
          position: ['10%', '5%'],
          content: '二氧化碳排放量来源',
          style: {
            fill: '#fff',
            fontSize: 12,
            textAlign: 'center',
            textBaseline: 'middle',
            shadowColor: '#fff',
            shadowOffsetX: 12,
            shadowOffsetY: 12,
            shadowBlur: 2,
          },
        }, 
        {
          type: 'line',
          start: ['min', 'median'],
          end: ['max', 'median'],
          style: {
            stroke: 'Turquoise',
            lineDash: [4, 2],
          },
        },
      ],
      legend: {
        position: 'top-right',
        itemName: {
          style: {
            fill: '#000',
          },
          formatter: (name) => name,
        },
      },
      meta: {
        year: {
          range: [0, 1],
        },
      },
    };
  return   <Line {...config} />;
}

export default App;
