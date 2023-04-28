import React from 'react'
import styles from './GridItem.module.scss'

export type Day = {
  day: number
  weekDay: string
  WorkingHours: number
  isWeekend: boolean
}

const GridITem: React.FunctionComponent<Day> = ({
  day,
  weekDay,
  WorkingHours,
  isWeekend,
}) => {
  const weekEndClass = isWeekend ? 'isWeekEnd' : ''
  return (
    <div
      className={`${styles['gridItem']} ${
        weekEndClass ? styles[weekEndClass] : ''
      }`}
    >
      <div>{`${weekDay}`}</div>
      <div className={`${styles.nOre}`}>{`${WorkingHours}`}</div>
    </div>
  )
}

export { GridITem }
