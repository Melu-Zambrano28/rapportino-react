import React from 'react'
import style from './GridItem.module.scss'

export type Giorno = {
  day: number
  weekDay: string
  WorkingHours: number
  isWeekend: boolean
}

const GridITem: React.FunctionComponent<Giorno> = ({
  day,
  weekDay,
  WorkingHours,
  isWeekend,
}) => {
  const weekEndClass = isWeekend ? 'isWeekEnd' : ''
  return (
    <div
      className={`${style['gridItem']} ${
        weekEndClass ? style[weekEndClass] : ''
      }`}
    >
      <div>{`${weekDay}`}</div>
      <div className={`${style.nOre}`}>{`${WorkingHours}`}</div>
    </div>
  )
}

export { GridITem }
