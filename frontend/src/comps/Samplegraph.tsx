// ProblemTagTimeChart.tsx
import React from 'react';

export interface ProblemTagTimeData {
  tag: string;
  timeSpent: number; // In minutes for example
}

interface ProblemTagTimeChartProps {
  data: ProblemTagTimeData[];
  title: string;
}

const ProblemTagTimeChart: React.FC<ProblemTagTimeChartProps> = ({ data }) => {
  const maxTime = Math.max(...data.map((item) => item.timeSpent), 0);
    const numBars = data.length;
    const barWidth = 100 / (numBars * 2); // Adjust as needed
    const barSpacing = barWidth;

  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'flex-end', paddingBottom:'40px'}}>
    {data.map((item,index)=>(
        <div
            key={item.tag}
            style={{
                width: `${barWidth}%`,
                height: `${(item.timeSpent / maxTime) * 100}%`,
                backgroundColor: 'skyblue',
                marginLeft: index === 0 ? 0 : `${barSpacing}%`, // Add left margin for spacing
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                position:'relative'
            }}
            >
            <span style={{ fontSize: '0.7rem', position:'absolute', bottom:'-40px', whiteSpace: 'nowrap', }}>{item.tag}</span>
            <span style={{ fontSize: 'smaller', marginBottom: '5px' }}>{item.timeSpent}m</span>
        </div>
    ))}
</div>
  );
};

export default ProblemTagTimeChart;