import { Day } from '..'

export const NO_WORKING_DAY_STYLE = {
  backgroundColor: `#FA5252`,
  color: 'white',
}

export const DEFAULT_CARD_STYLE = {
  backgroundColor: `#fff`,
  color: '#000',
}

export const WORKING_DAY_STYE = {
  backgroundColor: ` #2B8A3E`,
  color: '#000',
}

export const SICK_DAY = {
  backgroundColor: '#fcc419',
  color: '#white',
}

const WORKED_DAY = {
  backgroundColor: '#339af0',
  color: '#white',
}

const mappCardStyle = (day: Day) => {
  if (!(day.isWorked || day.isWeekend || day.isHoliday || day.isSickDay)) {
    return {}
  }

  if (day.isWorked) {
    return WORKED_DAY
  }

  if (day.isWeekend || day.isHoliday) {
    return NO_WORKING_DAY_STYLE
  }

  if (day.isWorked) {
    return WORKING_DAY_STYE
  }
}

export { mappCardStyle }
