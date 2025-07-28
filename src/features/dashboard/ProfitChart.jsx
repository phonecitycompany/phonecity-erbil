import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  BarChart,
  Bar,
  YAxis,
  XAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { useGetEarnData } from '../ownership/useGetEarnData';
import { formatCurrency, newFormatCurrency } from '../../utils/helpers';
import { useGetCapitalForDashboard } from './useGetCapitalForDashboard';
import { useGetCapitalForDashboardNew } from './useGetDashboardValue';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// );

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       display: false,
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Bar Chart',
//     },
//   },
// };

// const labels = ['May', 'June', 'July'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: [40, 45,67],
//       backgroundColor: [
//         'rgba(254, 184, 52)',
//         'rgba(86, 204, 242)',
//         'rgba(48, 191, 110)'
//     ],
//     barThickness: 20,
//     borderRadius: 4,

//     }
//   ],
// };

const colors = [
  'rgba(86, 204, 242)',
  'rgba(254, 184, 52)',
  'rgba(48, 191, 110)',
];

export function ProfitChart({
  className,
  setTodayMoney,
  setYesterdayMoney,
  setAllMoney,
}) {
  const { loadingForCapital, capitalItemData } = useGetCapitalForDashboardNew();

  const data = [
    {
      name: 'دوێنێ',
      uv: capitalItemData?.[0]?.yesterday_value || 0,
    },
    {
      name: 'ئەمڕۆ',
      uv: capitalItemData?.[0]?.today_value || 0,
    },
    {
      name: 'قزانج',
      uv: capitalItemData?.[0]?.difference || 0,
    },
  ];

  useEffect(() => {
    if (capitalItemData) {
      setTodayMoney(capitalItemData?.[0]?.today_value || 0);
      setYesterdayMoney(capitalItemData?.[0]?.yesterday_value || 0);
      setAllMoney(capitalItemData?.[0]?.difference);
      // setTodayMoney(0)
    }
  });

  return (
    <>
      <div
        className={` ${className} rtl flex flex-col rounded-xl bg-white p-4 text-[#A4AAB8]`}
      >
        <h1 className="mb-3 text-4xl">
          جیاوازی دەستمایەی ئەمڕۆ و دوێنێ و بڕی قازانج
        </h1>
        <div className="flex h-full flex-row justify-between">
          <div className="flex  w-1/3 flex-col gap-10">
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-4">
                <p className="h-5 w-5 rounded-full bg-[#FEB834]"></p>
                <p>دەستمایەی ئەمڕۆ</p>
              </div>
              <div className="flex flex-row items-center gap-4">
                <p className="h-5 w-5 rounded-full bg-[#56CCF2]"></p>

                <p>دەستمایەی دوێنێ</p>
              </div>
              <div className="flex flex-row items-center gap-4">
                <p className="h-5 w-5 rounded-full bg-[#30BF6E]"></p>
                <p>قازانج</p>
              </div>
            </div>
            <div className="flex w-2/3 flex-col gap-3">
              <div className="ltr flex shrink-0 flex-row items-center justify-between whitespace-nowrap rounded-lg border-2 border-[#FEB834] p-3 leading-tight">
                <p className="text-3xl font-bold text-black">
                  {newFormatCurrency(capitalItemData?.[0]?.today_value || 0)}
                </p>
                <p className="text-3xl font-bold text-black">$</p>
              </div>
              <div className="ltr flex shrink-0 flex-row items-center justify-between whitespace-nowrap rounded-lg border-2 border-[#56CCF2] p-3 leading-tight">
                <p className="text-3xl font-bold text-black">
                  {newFormatCurrency(
                    capitalItemData?.[0]?.yesterday_value || 0,
                  )}
                </p>
                <p className="text-3xl font-bold text-black">$</p>
              </div>
              <div className="ltr flex shrink-0 flex-row items-center justify-between whitespace-nowrap rounded-lg border-2 border-[#30BF6E] p-3 leading-tight">
                <p className="text-3xl font-bold text-black">
                  {newFormatCurrency(capitalItemData?.[0]?.difference || 0)}
                </p>
                <p className="text-3xl font-bold text-black">$</p>
              </div>
            </div>
          </div>
          <div className="mt-6 w-2/3 ">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart className="h-full w-full " data={data}>
                <XAxis
                  axisLine={false}
                  tickLine={false}
                  dataKey="name"
                  className="text-[#A4AAB8]"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  textAnchor="left"
                  className="text-[#A4AAB8]"
                />
                {/* <Tooltip /> */}
                <CartesianGrid
                  vertical={false}
                  horizontal={true}
                  stroke="rgb(107, 114, 128)"
                  strokeDasharray="10 11"
                />
                <Bar
                  dataKey="uv"
                  fill="#8884d8"
                  barSize={50}
                  radius={[10, 10, 0, 0]}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}