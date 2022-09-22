import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { TradesInfo } from '@kdb-dash/dashboard/domain';

export interface TradeChartDataKeys {
  dataKeyYA: keyof TradesInfo;
  dataKeyYB: keyof TradesInfo;
  dataKeyX: keyof TradesInfo;
}

interface TradesChartProps {
  data: TradesInfo[];
  dataKeys: TradeChartDataKeys;
}

export function TradesChart({ data, dataKeys }: TradesChartProps) {
  const { dataKeyX, dataKeyYA, dataKeyYB } = dataKeys;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 20,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="2 6" stroke="#2d4d5f" />
        <XAxis dataKey={dataKeyX} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKeyYA} fill="#199eeb" />
        <Bar dataKey={dataKeyYB} fill="#eb8d30" />
      </BarChart>
    </ResponsiveContainer>
  );
}
