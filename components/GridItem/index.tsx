import React from 'react'
import styles from './GridItem.module.scss'

export type Day = {
  day: number
  weekDay: string
  WorkingHours: number
  isWeekend: boolean
  isWorked: boolean
  isHoliday: boolean
}

const GridITem: React.FunctionComponent<Day> = ({
  day,
  weekDay,
  WorkingHours,
  isWeekend,
  isWorked,
  isHoliday,
}) => {
  const weekEndClass = isWeekend || isHoliday ? 'isWeekEnd' : ''
  return (
    <div
      className={`${styles['gridItem']} ${
        weekEndClass ? styles[weekEndClass] : ''
      }`}
    >
      <div>{`${weekDay}`}</div>
      <div className={`${styles.nOre}`}>{`${WorkingHours}`}</div>
      {isHoliday && <div>{`Festivo`}</div>}
    </div>
  )
}

export { GridITem }
