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

export { getAllDates, toCapitalize }
