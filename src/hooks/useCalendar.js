import { useState, useEffect, useCallback } from "react";
import { habitService } from "../services/habitService.js";

export function useCalendar(initialDate = new Date()) {
  const [currentMonth, setCurrentMonth] = useState(initialDate);
  const [calendarData, setCalendarData] = useState({
    completedDays: [],
    missedDays: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCalendar = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await habitService.getMonthlyData(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
      );
      setCalendarData({
        completedDays: data?.completedDays || [],
        missedDays: data?.missedDays || [],
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentMonth]);

  useEffect(() => {
    fetchCalendar();
  }, [fetchCalendar]);

  const prevMonth = useCallback(() => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  }, []);

  const nextMonth = useCallback(() => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  }, []);

  return {
    currentMonth,
    calendarData,
    loading,
    error,
    prevMonth,
    nextMonth,
    refetch: fetchCalendar,
  };
}
