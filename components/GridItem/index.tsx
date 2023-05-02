import React from 'react'
import styles from './GridItem.module.scss'

export type Day = {
  id: number
  date: Date
  WorkingHours: number
  isWeekend: boolean
  isWorked: boolean
  isHoliday: boolean
}

const GridITem: React.FunctionComponent<Day> = ({
  id,
  date,
  WorkingHours,
  isWeekend,
  isWorked,
  isHoliday,
}) => {
  const weekEndClass = isWeekend || isHoliday ? 'isWeekEnd' : ''
  const dateFormat = date.toLocaleString('it-IT', {
    weekday: 'long',
    day: '2-digit',
  })
  return (
    <div
      className={`${styles['gridItem']} ${
        weekEndClass ? styles[weekEndClass] : ''
      }`}
    >
      <div>{`${dateFormat}`}</div>
      <div className={`${styles.nOre}`}>{`${WorkingHours}`}</div>
      {isHoliday && <div>{`Festivo`}</div>}
    </div>
  )
}

export { GridITem }
