// DashboardPage.js

import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { useLocation, useNavigate } from 'react-router-dom';
import './dashboard.css';

const DashboardPage = () => {
    const location = useLocation();
    const data = location.state;
    const history = useNavigate();
    const [selectedMetrics, setSelectedMetrics] = useState([]);
    const [chartType, setChartType] = useState('bar');
  
    const handleMetricChange = (event) => {
      const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
      setSelectedMetrics(selectedOptions);
    };
  
    const handleChartTypeChange = (event) => {
      setChartType(event.target.value);
    };

    const handleBack = () => {
        history('/');
      };
  
    const renderCharts = () => {
      if (!data) return null;
    
      const months = Object.keys(data[0]).filter((key) => key !== '__EMPTY');
    
      const formatSeries = (metric) => {
        switch (chartType) {
          case 'bar':
            return {
              name: metric.__EMPTY,
              data: Object.values(metric).filter((value) => typeof value === 'number'),
            };
          case 'area':
            const seriesData = Object.entries(metric)
              .filter(([key]) => key !== '__EMPTY')
              .map(([key, value]) => ({ x: key, y: value }));
            return {
              name: metric.__EMPTY,
              data: seriesData,
            };
          default:
            return {
              name: metric.__EMPTY,
              data: Object.values(metric).filter((value) => typeof value === 'number'),
            };
        }
      };
    
      const series = data
        .filter((metric) => selectedMetrics.includes(metric.__EMPTY) || selectedMetrics.length === 0)
        .map(formatSeries);
    
      let chartData = {
        options: {
          xaxis: {
            categories: months,
          },
        },
        legend: {
          show: true,
          position: 'top',
          fontSize: '14px',
        fontFamily: 'Helvetica, Arial',
        },
        series,
      };
    
      switch (chartType) {
        case 'bar':
          break;
        case 'area':
          chartData = {
            ...chartData,
            options: {
              ...chartData.options,
              chart: {
                stacked: false,
              },
            },
          };
          break;
        default:
          break;
      }
    
      return (
        <>
          <h1>Environmental Metrics Dashboard</h1>
          <div className='selectoptions'>
            <select multiple onChange={handleMetricChange}>
              {data.map((metric, index) => (
                <option key={index} value={metric.__EMPTY}>
                  {metric.__EMPTY}
                </option>
              ))}
            </select>
            <select value={chartType} onChange={handleChartTypeChange}>
              <option value="bar">Bar Chart</option>
              <option value="area">Area Chart</option>
            </select>
          </div>
          <div className="chart-container">
            <Chart options={chartData.options} series={chartData.series} type={chartType} height={400} />
          </div>
        </>
      );
    };
  
    return (
      <div className="Dashboard">
        <button className="back-button" onClick={handleBack}>Back</button>
        {renderCharts()}
      </div>
    );
};

export default DashboardPage;
