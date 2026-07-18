import { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'heroui-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isAfter,
  isSameDay,
  parseISO,
  startOfDay,
  startOfMonth,
  subDays,
} from 'date-fns';

import { cn } from '@/lib/utils';

const WEEKDAYS = [
  { key: 'sun', label: 'S' },
  { key: 'mon', label: 'M' },
  { key: 'tue', label: 'T' },
  { key: 'wed', label: 'W' },
  { key: 'thu', label: 'T' },
  { key: 'fri', label: 'F' },
  { key: 'sat', label: 'S' },
];

interface MonthCalendarProps {
  /** ISO yyyy-MM-dd dates to mark as surfed */
  markedDates?: string[];
  /** currently selected ISO yyyy-MM-dd (optional) */
  selected?: string;
  /** month to display initially (Date); defaults to today or selected */
  initialMonth?: Date;
  /** called with ISO yyyy-MM-dd when a day is tapped */
  onSelectDate?: (iso: string) => void;
  /** prevent selecting/highlighting days after today */
  disableFuture?: boolean;
}

export function MonthCalendar({
  markedDates = [],
  selected,
  initialMonth,
  onSelectDate,
  disableFuture = false,
}: MonthCalendarProps) {
  const [cursor, setCursor] = useState<Date>(
    () => initialMonth ?? (selected ? parseISO(selected) : new Date()),
  );

  const marked = useMemo(() => new Set(markedDates), [markedDates]);
  const today = startOfDay(new Date());

  const cells = useMemo(() => {
    const first = startOfMonth(cursor);
    const days = eachDayOfInterval({ start: first, end: endOfMonth(cursor) });
    const leading = getDay(first); // 0 = Sunday
    const placeholders = Array.from({ length: leading }, (_, i) => subDays(first, leading - i));
    return [
      ...placeholders.map((d) => ({ date: d, inMonth: false })),
      ...days.map((d) => ({ date: d, inMonth: true })),
    ];
  }, [cursor]);

  return (
    <View className="bg-surface border-border rounded-3xl border p-4">
      <View className="flex-row items-center justify-between">
        <Pressable
          onPress={() => setCursor((c) => addMonths(c, -1))}
          hitSlop={8}
          className="bg-foam h-9 w-9 items-center justify-center rounded-full"
        >
          <ChevronLeft size={18} color="#2f6bb0" />
        </Pressable>
        <Text className="text-ink text-base font-bold">{format(cursor, 'MMMM yyyy')}</Text>
        <Pressable
          onPress={() => setCursor((c) => addMonths(c, 1))}
          hitSlop={8}
          className="bg-foam h-9 w-9 items-center justify-center rounded-full"
        >
          <ChevronRight size={18} color="#2f6bb0" />
        </Pressable>
      </View>

      <View className="mt-3 flex-row">
        {WEEKDAYS.map((d) => (
          <View key={d.key} className="flex-1 items-center py-1">
            <Text className="text-slate-soft text-xs font-semibold">{d.label}</Text>
          </View>
        ))}
      </View>

      <View className="flex-row flex-wrap">
        {cells.map(({ date: day, inMonth }) => {
          const iso = format(day, 'yyyy-MM-dd');
          if (!inMonth)
            return <View key={`e-${iso}`} style={{ width: `${100 / 7}%` }} className="py-1" />;
          const isMarked = marked.has(iso);
          const isSelected = selected ? isSameDay(day, parseISO(selected)) : false;
          const isToday = isSameDay(day, today);
          const isFuture = disableFuture && isAfter(startOfDay(day), today);

          return (
            <Pressable
              key={iso}
              style={{ width: `${100 / 7}%` }}
              className="items-center py-1"
              disabled={isFuture || !onSelectDate}
              onPress={() => onSelectDate?.(iso)}
            >
              <View
                className={cn(
                  'h-10 w-10 items-center justify-center rounded-full',
                  isSelected && 'bg-ocean',
                  !isSelected && isMarked && 'bg-foam',
                )}
              >
                <Text
                  className={cn(
                    'text-sm',
                    isFuture ? 'text-slate-soft/40' : 'text-ink',
                    isSelected && 'font-bold text-white',
                    !isSelected && isMarked && 'text-ocean-deep font-bold',
                    !isSelected && isToday && 'text-ocean font-bold',
                  )}
                >
                  {format(day, 'd')}
                </Text>
                {isMarked && !isSelected ? (
                  <View className="bg-ocean absolute bottom-1 h-1 w-1 rounded-full" />
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
