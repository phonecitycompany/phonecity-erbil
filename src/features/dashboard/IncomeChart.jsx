import React, { useEffect } from 'react';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useGetCapital } from '../ownership/useGetCapital';
import { useGetAllCapital } from './useGetAllCapital';
import { useSearchParams } from 'react-router-dom';
import { useGetEarnData } from '../ownership/useGetEarnData';

const labels = {
  Friday: 'هەینی',
  Saturday: 'شەمە',
  Sunday: 'یەک ',
  Monday: ' دوو',
  Tuesday: 'سێ',
  Wednesday: 'چوار',
  Thursday: 'پێنج',
};

export function IncomeChart({ className }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { newCombinedData, isLoading, count } = useGetAllCapital();

  const previousDates = [];
  const currentDate = new Date();

  for (let i = 1; i <= 6; i++) {
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - i);
    previousDates.push(previousDate.toISOString().split('T')[0]);
  }
  const today = new Date().toISOString().split('T')[0];
  const onedayAgo = previousDates[0];
  const twodayAgo = previousDates[1];
  const threedayAgo = previousDates[2];
  const fourdayAgo = previousDates[3];
  const fivedayAgo = previousDates[4];
  const sixdayAgo = previousDates[5];
  const dayInText = currentDate.toLocaleDateString('ku', {
    weekday: 'long',
  });

  const data = [
    {
      name:
        newCombinedData?.capitalItemone &&
        new Date(onedayAgo).toLocaleDateString('ku', { weekday: 'long' }),
      قازانج:
        (newCombinedData?.capitalItemone &&
          newCombinedData?.capitalItemone[0]?.value) ||
        0,
    },
    {
      name:
        newCombinedData?.capitalItemtwo &&
        new Date(twodayAgo).toLocaleDateString('ku', { weekday: 'long' }),
      قازانج:
        (newCombinedData?.capitalItemtwo &&
          newCombinedData?.capitalItemtwo[0]?.value) ||
        0,
    },
    {
      name:
        newCombinedData?.capitalItemthree &&
        new Date(threedayAgo).toLocaleDateString('ku', { weekday: 'long' }),
      قازانج:
        (newCombinedData?.capitalItemthree &&
          newCombinedData?.capitalItemthree[0]?.value) ||
        0,
    },
    {
      name:
        newCombinedData?.capitalItemfour &&
        new Date(fourdayAgo).toLocaleDateString('ku', { weekday: 'long' }),
      قازانج:
        (newCombinedData?.capitalItemfour &&
          newCombinedData?.capitalItemfour[0]?.value) ||
        0,
    },
    {
      name:
        newCombinedData?.capitalItemfive &&
        new Date(fivedayAgo).toLocaleDateString('ku', { weekday: 'long' }),
      قازانج:
        (newCombinedData?.capitalItemfive &&
          newCombinedData?.capitalItemfive[0]?.value) ||
        0,
    },
    {
      name:
        newCombinedData?.capitalItemsix &&
        new Date(sixdayAgo).toLocaleDateString('ku', { weekday: 'long' }),
      قازانج:
        (newCombinedData?.capitalItemsix &&
          newCombinedData?.capitalItemsix[0]?.value) ||
        0,
    },
    {
      name:
        (newCombinedData?.capitalItemToday &&
          new Date(today).toLocaleDateString('ku', { weekday: 'long' }) ===
            'invalid date') ||
        dayInText,
      قازانج:
        (newCombinedData?.capitalItemToday &&
          newCombinedData?.capitalItemToday[0]?.value) ||
        0,
    },
  ];

  return (
    <div className={` ${className} rounded-xl bg-white p-4`}>
      <h1 className="mb-3 text-4xl text-[#A4AAB8]">‌هێڵکاری ڕیژەی قازانج</h1>
      <div className="w-full ">
        {/* <ResponsiveContainer width="100%" height="100%"> */}
        <AreaChart className=" mx-auto" data={data} width={500} height={300}>
          <CartesianGrid
            vertical={false}
            horizontal={true}
            strokeDasharray="10 11"
            stroke="rgb(107, 114, 128)"
          />
          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey="name"
            className="text-xl"
          />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Area
            type="natural"
            dataKey="قازانج"
            stroke="#42BD53"
            fill="#42BD5380"
          />
        </AreaChart>
        {/* </ResponsiveContainer> */}
      </div>
    </div>
  );
}
