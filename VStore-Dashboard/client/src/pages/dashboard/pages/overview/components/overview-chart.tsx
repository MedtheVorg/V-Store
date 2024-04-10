import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

type OverviewProps = {
  data: any[];
};

export function OverviewChart({ data }: OverviewProps) {
  return (
    <ResponsiveContainer width={'100%'} height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#1B1B1F"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#1B1B1F"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey={'total'}
          fill="#111"
          className="dark:fill-white"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
