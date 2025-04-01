import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Price"]]);

  useEffect(() => {
    if (!historicalData?.prices) return;

    let dataCopy = [["Date", "Price"]];

    historicalData.prices.forEach((item) => {
      dataCopy.push([new Date(item[0]), item[1]]); 
    });

    setData(dataCopy);
  }, [historicalData]);

  const options = {
    title: "Price Trend",
    hAxis: {
      title: "Date",
      format: "MMM dd, yyyy",
    },
    vAxis: {
      title: "Price",
    },
    legend: { position: "bottom" },
  };

  return (
    <div>
        <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
            className="chart"
        />
    </div>
  );
};

export default LineChart;
