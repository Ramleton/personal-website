'use client';

import { getContributions, selectBestWindow } from '@/services/githubContributions';

import { ContributionDay } from '@/types/githubContributions';
import { useQuery } from '@tanstack/react-query';

function getColor(count: number): string {
  if (count === 0) {return 'bg-zinc-100 dark:bg-zinc-800';}
  if (count <= 2) {return 'bg-emerald-200 dark:bg-emerald-900';}
  if (count <= 5) {return 'bg-emerald-300 dark:bg-emerald-700';}
  if (count <= 9) {return 'bg-emerald-400 dark:bg-emerald-500';}
  return 'bg-emerald-500 dark:bg-emerald-400';
}

function groupIntoWeeks(days: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  let week: ContributionDay[] = [];

  if (days.length > 0) {
    for (let i = 0; i < days[0].weekday; i++) {
      week.push({ date: '', contributionCount: -1, weekday: i });
    }
  }

  for (const day of days) {
    week.push(day);
    if (day.weekday === 6) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length > 0) {weeks.push(week);}

  return weeks;
}

export default function ContributionChart() {
  const { data: allDays = [], isLoading } = useQuery({
    queryKey: ['contributions'],
    queryFn: getContributions,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  if (isLoading) {
    return (
      <div className='mt-3 h-12 w-full animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800' />
    );
  }

  if (!allDays.length) {return null;}

  const { days, months } = selectBestWindow(allDays);
  const weeks = groupIntoWeeks(days);
  const totalContributions = days.reduce(
    (sum, day) => sum + day.contributionCount,
    0,
  );

  return (
    <div className='mt-3 w-full px-1'>
      <div className='mb-1.5 flex items-center justify-between'>
        <p className='font-mono text-xs text-zinc-400 dark:text-zinc-500'>
          {totalContributions} contributions in the last{' '}
          {months === 1 ? 'month' : `${months} months`}
        </p>
      </div>

      <div className='flex w-full gap-1 sm:gap-1.5'>
        {weeks.map((week, wi) => (
          <div key={wi} className='flex flex-1 flex-col gap-1 sm:gap-1.5'>
            {week.map((day, di) => {
              const [year, month, dayNum] = day.date.split('-');
              const label = new Date(
                Number(year),
                Number(month) - 1,
                Number(dayNum)
              ).toLocaleDateString('en-CA', {
                month: 'short',
                day: 'numeric',
              });

              return day.contributionCount === -1 ? (
                <div key={`pad-${di}`} className='w-full aspect-square' />
              ) : (
                <div
                  key={day.date}
                  title={`${day.contributionCount} contributions on ${label}`}
                  className={`w-full aspect-square rounded-[2px] sm:rounded-sm ${getColor(
                    day.contributionCount
                  )}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}