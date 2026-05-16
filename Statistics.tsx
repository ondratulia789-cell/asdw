import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface MonthlyChartProps {
  data: { month: string; minutes: number }[];
}

const MonthlyChart = ({ data }: MonthlyChartProps) => {
  // šířka podle počtu měsíců (funguje pro 12 i méně)
  const BAR_WIDTH = 60;
  const chartMinWidth = data.length * BAR_WIDTH;

  return (
    <div className="space-y-8">
      <div className="gradient-border rounded-xl bg-card/30 p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-foreground">
          Čas podle měsíců
        </h3>

        {/* SCROLL WRAPPER */}
        <div className="relative mt-6 h-64 overflow-x-auto overflow-y-hidden">
          <div
            className="h-full"
            style={{ minWidth: chartMinWidth }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "hsl(240 5% 55%)",
                    fontSize: 12,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "hsl(240 5% 55%)",
                    fontSize: 12,
                  }}
                  tickFormatter={(value) =>
                    `${(value / 60).toFixed(0)}h`
                  }
                />

                <Tooltip
                  cursor={{ fill: "hsl(240 10% 15%)" }}
                  formatter={(value: number) => [
                    `${(value / 60).toFixed(1)} h`,
                    "Čas",
                  ]}
                />

                <Bar
                  dataKey="minutes"
                  barSize={40}
                  radius={[6, 6, 0, 0]}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill="hsl(240 5% 25%)"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* HINT jen na mobilu */}
        {chartMinWidth > 400 && (
          <p className="mt-2 text-xs text-muted-foreground md:hidden text-center">
            ← posuň pro další měsíce →
          </p>
        )}
      </div>
    </div>
  );
};

export default MonthlyChart;

