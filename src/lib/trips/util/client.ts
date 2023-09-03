'use client';

import { DaysOfWeek } from "@/lib/state/create_trip";

export const formatDays = (days: DaysOfWeek[]): string => {
    if (!days) {
        return 'No days'
    }

    if (days.length === 0) {
        return 'No days'
    };

    if (days.length === 2 && (days.includes('Saturday') && days.includes('Sunday'))) {
        return 'Weekends';
    };
    if (days.length === 5 && (!days.includes('Saturday') && !days.includes('Sunday'))) {
        return 'Weekdays';
    };
    if (days.length === 1) {
        return days[0];
    };

    if (days.length === 2) {
        return `${days[0]} & ${days[1]}`
    }

    // check for consecutive days
    
    const dayIndices = {
        'Sunday': 0,
        'Monday': 1,
        'Tuesday': 2,
        'Wednesday': 3,
        'Thursday': 4,
        'Friday': 5,
        'Saturday': 6
      };

      let consecutive = true;
    
      // Sort the days in the list by their indices.
      const sortedDaysList = days.sort((a, b) => dayIndices[a] - dayIndices[b]);
    
      // Check if the sorted list forms a consecutive sequence.
      for (let i = 0; i < sortedDaysList.length - 1; i++) {
        const currentDayIndex = dayIndices[sortedDaysList[i]];
        const nextDayIndex = dayIndices[sortedDaysList[i + 1]];
    
        if (nextDayIndex !== (currentDayIndex + 1) % 7) {
          consecutive = false;
          break;
        }
      }

    if (consecutive) {
        return `${days[0]} - ${days[days.length - 1]}`
    }

    else {
        return days.join(', ');
    }
}