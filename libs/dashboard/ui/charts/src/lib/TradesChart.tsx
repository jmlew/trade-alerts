import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { TradesInfo } from '@trade-alerts/dashboard/domain';

import { ChartAttribute, chartColors, chartLabels } from './chart-configs.constants';

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
      <ComposedChart
        data={data}
        margin={{
          top: 10,
          right: 20,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid
          strokeDasharray="2 6"
          stroke={chartColors.get(ChartAttribute.Grid)}
        />
        <XAxis dataKey={dataKeyX} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={dataKeyYA}
          name={chartLabels.get(dataKeyYA)}
          fill={chartColors.get(ChartAttribute.ValueA)}
          maxBarSize={20}
        />
        <Bar
          dataKey={dataKeyYB}
          name={chartLabels.get(dataKeyYB)}
          fill={chartColors.get(ChartAttribute.ValueB)}
          maxBarSize={20}
        />
        {/*  <Line
          type="monotone"
          dataKey={dataKeyYA}
          name={`Average`}
          stroke={chartColors.get(ChartAttribute.Average)}
        /> */}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
