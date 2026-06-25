'use client';

import { ContributionDay } from '@/types/githubContributions';
import { getContributions } from '@/services/githubContributions';
import { useQuery } from '@tanstack/react-query';

function getColor(count: number): string {
  if (count === 0) {return 'bg-zinc-100 dark:bg-zinc-800';}
  if (count <= 2) {return 'bg-emerald-200 dark:bg-emerald-900';}
  if (count <= 5) {return 'bg-emerald-300 dark:bg-emerald-700';}
  if (count <= 9) {return 'bg-emerald-400 dark:bg-emerald-500';}
  return 'bg-emerald-500 dark:bg-emerald-400';
}

export default function ContributionChart() {
  const { data: days = [], isLoading } = useQuery({
    queryKey: ['contributions'],
    queryFn: getContributions,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  if (isLoading) {
    return (
      <div className='mt-3 h-12 w-full animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800' />
    );
  }

  if (!days.length) {return null;}

  // Group days into weeks
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  days.forEach((day) => {
    currentWeek.push(day);
    if (day.weekday === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) {weeks.push(currentWeek);}

  const totalContributions = days.reduce(
    (sum, day) => sum + day.contributionCount,
    0,
  );

  return (
    <div className='mt-3 px-1'>
      <div className='mb-1.5 flex items-center justify-between'>
        <p className='font-mono text-xs text-zinc-400 dark:text-zinc-500'>
          {totalContributions} contributions in the last 3 months
        </p>
      </div>

      <div className='flex gap-1.5'>
        {weeks.map((week, wi) => (
          <div key={wi} className='flex flex-col gap-1'>
            {week.map((day, di) => {
							const [year, month, dayNum] = day.date.split('-');
							const label = new Date(Number(year), Number(month) - 1, Number(dayNum))
								.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' });
							return day.contributionCount === -1 ? (
								<div key={`pad-${di}`} className='h-2.5 w-2.5' />
							) : (
								<div
									key={day.date}
									title={`${day.contributionCount} contributions on ${label}`}
									className={`h-3.5 w-3.5 rounded-[2px] ${getColor(day.contributionCount)}`}
								/>
							);
						}
					)}
          </div>
        ))}
      </div>
    </div>
  );
}