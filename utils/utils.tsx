import { Day } from '../components/GridItem'

export const optionDatesGGMM = {
  weekday: 'long',
  day: '2-digit',
}

const getAllDates = (year: number, month: number): Date[] => {
  let date = new Date(year, month, 1)
  let dates: Date[] = []
  let i = 0

  while (date.getMonth() === month) {
    const currentDate = new Date(date)

    dates.push(currentDate)

    date.setDate(date.getDate() + 1)
    i++
  }

  return dates
}

const toCapitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

const getWorkingDaysByAutocompilation = (
  allDates: Date[],
  autoCompilation: boolean,
) => {
  return allDates.map((_) => {
    const day = _.getDay() + 1
    const isWeekEnd = day === 1 || day === 7
    return {
      day: _.getDate() + 1,
      weekDay: _.toLocaleString('it-IT', {
        weekday: 'long',
        day: '2-digit',
      }),
      WorkingHours: autoCompilation && !isWeekEnd ? 8 : 0,
      isWorked: autoCompilation && !isWeekEnd ? true : false,
      isWeekend: autoCompilation && isWeekEnd,
    }
  })
}

const countWorkedDays = (days: Day[]): number => {
  const count = days.reduce(
    (accumulator, currentValue) =>
      currentValue.isWorked ? accumulator + 1 : accumulator,
    0,
  )

  return count
}

const countWorkedHours = (days: Day[]): number => {
  const count = days.reduce(
    (accumulator, currentValue) =>
      currentValue.isWorked
        ? accumulator + currentValue.WorkingHours
        : accumulator,
    0,
  )

  return count
}

export {
  getAllDates,
  toCapitalize,
  getWorkingDaysByAutocompilation,
  countWorkedDays,
  countWorkedHours,
}
