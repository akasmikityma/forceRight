// import React from 'react';
import RatingChart from '@/comps/RatingChart';
import HeatMapChart from '@/comps/HeatMapChart';
import PieChartComponent from '@/comps/PieChartComp';
import BarChartComponent from '@/comps/BarchartTags';
const Analytics = () => {
  return (
    <div className="h-full p-8 flex flex-col gap-10 items-center">
      <RatingChart />
      <HeatMapChart />
      <PieChartComponent/>
      <BarChartComponent/>
    </div>
  );
};

export default Analytics;
