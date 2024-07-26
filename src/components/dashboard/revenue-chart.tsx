import db from '@/db/db';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import dayjs from 'dayjs';
import { generateYAxis } from '@/lib/formatters';

async function fetchRevenue() {
  const orders = await db.order.findMany({
    select: {
      soldPrice: true,
      createdAt: true,
    },
  });

  const monthlySales = Array.from({ length: 12 }, (_, month) => ({
    month,
    revenue: 0,
  }));

  orders.forEach((order) => {
    const month = dayjs(order.createdAt).month(); // 0-11
    monthlySales[month].revenue += order.soldPrice;
  });
  
  return monthlySales;
}

export default async function RevenueChart() {
  const revenue = await fetchRevenue();
  const chartHeight = 350;

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={` mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>

      <div className="rounded-xl bg-gray-50 p-3">
        <div className=" mt-0 grid grid-cols-12 sm:grid-cols-13 items-end gap-2 rounded-md bg-white p-4 md:gap-3">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {dayjs().month(month.month).format('MMM')}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <MdOutlineCalendarMonth className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
