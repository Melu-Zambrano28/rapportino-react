import { Day } from '../components/GridItem'
import { holidaysData } from './holidays'

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

const compareNumbers = (a: number, b: number) => {
  return a - b
}

const toCapitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

const getEeaster = (Y: number) => {
  var C = Math.floor(Y / 100)
  var N = Y - 19 * Math.floor(Y / 19)
  var K = Math.floor((C - 17) / 25)
  var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15
  I = I - 30 * Math.floor(I / 30)
  I =
    I -
    Math.floor(I / 28) *
      (1 -
        Math.floor(I / 28) *
          Math.floor(29 / (I + 1)) *
          Math.floor((21 - N) / 11))
  var J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4)
  J = J - 7 * Math.floor(J / 7)
  var L = I - J
  var M = 3 + Math.floor((L + 40) / 44)
  var D = L + 28 - 31 * Math.floor(M / 4)

  return new Date(Y, M - 1, D)
}

const getHolidays = (year: number, month: number): number[] => {
  const easter = getEeaster(year)
  const pasquetta = new Date(easter)
  pasquetta.setDate(easter.getDate() + 1)
  const newObj = { ...holidaysData }

  let holliDayToReturn: number[] = [...newObj[month].days]

  if (month === easter.getMonth() + 1) {
    holliDayToReturn = [...holliDayToReturn, easter.getDate()]
  }

  if (month === pasquetta.getMonth() + 1) {
    holliDayToReturn = [...holliDayToReturn, pasquetta.getDate()]
  }

  return holliDayToReturn.sort(compareNumbers)
}

const getWorkingDaysByAutocompilation = (
  current_date: Date,
  autoCompilation: boolean,
) => {
  const anno = current_date.getFullYear()
  const mese = current_date.getMonth()

  const allDates = getAllDates(anno, mese)

  const monthHolidays = getHolidays(anno, mese + 1)

  return allDates.map((_) => {
    const day = _.getDate()
    const dayOfWeek = _.getDay() + 1
    const isWeekEnd = dayOfWeek === 1 || dayOfWeek === 7

    const isHoliday = monthHolidays.some((holiday) => holiday === day)

    const initialDay = {
      id: day,
      date: _,
      WorkingHours: 0,
      isWorked: false,
      isWeekend: isWeekEnd,
      isHoliday: isHoliday,
    }

    if (!autoCompilation) {
      return initialDay
    }

    return {
      ...initialDay,
      WorkingHours: !isWeekEnd && !isHoliday ? 8 : 0,
      isWorked: !isWeekEnd && !isHoliday ? true : false,
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

type Counters = {
  workedDays: number
  workedHous: number
}

const countWorkedDaysCounter = (days: Day[]): Counters => {
  const counters = days.reduce(
    (accumulator, currentValue) => {
      return {
        workedDays: currentValue.isWorked
          ? accumulator.workedDays + 1
          : accumulator.workedDays,
        workedHous: currentValue.isWorked
          ? accumulator.workedHous + currentValue.WorkingHours
          : accumulator.workedHous,
      }
    },
    {
      workedDays: 0,
      workedHous: 0,
    },
  )

  return counters
}

export {
  getAllDates,
  toCapitalize,
  getWorkingDaysByAutocompilation,
  countWorkedDays,
  countWorkedHours,
  getEeaster,
  getHolidays,
  countWorkedDaysCounter,
}
