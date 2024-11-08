import { format } from "date-fns";
import {
  Tooltip,
  XAxis,
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import CustomTooltip from "./CustomToolTip";

type Props = {
  data?: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

function LineVariant({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => format(value, "dd MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />

        <Tooltip
          content={({ active, payload }) => (
            <CustomTooltip active={active} payload={payload} />
          )}
        />

        <Line
          dot={false}
          dataKey="income"
          stroke="#3b82f6"
          strokeWidth={2}
          className="drop-shadow-sm"
        />

        <Line
          dot={false}
          dataKey="expenses"
          stroke="#f43f5e"
          strokeWidth={2}
          className="drop-shadow-sm"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineVariant;
