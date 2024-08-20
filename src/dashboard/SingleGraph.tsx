import React from 'react';
import {
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceDot,
  ReferenceLine,
  ReferenceArea,
} from 'recharts';
import Paper from '@material-ui/core/Paper';

const CustomTooltip = ({ active, payload }: any) => {
  if (!active) return null;
  if (payload && payload[0] && payload[0].payload) {
    const keys = Object.keys(payload[0].payload);
    return (
      <div style={{
        backgroundColor: '#fff', padding: 10, border: '1px solid #e5e5e5', fontSize: 11,
      }}
      >
        {keys.map((key: any) => (
          <div key={key}>{`${key}: ${payload[0].payload[key]}`}</div>
        ))}
      </div>
    );
  }
  return null;
};

const SingleGraph = ({ graphData, title }: any) => (
  <>
    <Paper elevation={0} style={{ backgroundColor: '#fff', padding: 20, marginTop: 30 }}>
      <h2 style={{ margin: 0, paddingBottom: 30 }}>{title}</h2>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={graphData}>
          <defs>
            <linearGradient id="scoreChartColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="reagentChartColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fbf3eb" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#fbf3eb" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="score" stroke="#3fab67" fillOpacity={1} fill="url(#scoreChartColor)" />
          <ReferenceDot />
          <ReferenceLine />
          <ReferenceArea />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  </>
);

export default SingleGraph;
