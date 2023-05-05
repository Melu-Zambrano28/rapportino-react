import React from 'react'
import styles from './GridItem.module.scss'
import { Flex } from '@mantine/core'

export type Day = {
  readonly id: number
  date: Date
  WorkingHours: number
  isWeekend: boolean
  isWorked: boolean
  isHoliday: boolean
}

type GridItemProp = {
  day: Day
  handleDay: (dayModify: Day) => void
}

const GridITem: React.FunctionComponent<GridItemProp> = ({
  day,
  handleDay,
}) => {
  const weekEndClass = day.isWeekend || day.isHoliday ? 'isNotWorkingDay' : ''
  const dateFormat = day.date.toLocaleString('it-IT', {
    weekday: 'long',
    day: '2-digit',
  })

  const toggleWorkingDay = (isWorked: boolean) => {
    const workingHours = isWorked ? 8 : 0
    handleDay({ ...day, isWorked: isWorked, WorkingHours: workingHours })
  }

  return (
    <Flex
      direction={`column`}
      className={`${styles['gridItem']} ${
        weekEndClass ? styles[weekEndClass] : ''
      }`}
    >
      <div>
        <label htmlFor={`isWorkingDay${day.id}`}> {`${dateFormat}`}</label>
      </div>
      <div className={`${styles.nOre}`}>{`${day.WorkingHours}`}</div>
      <Flex direction={`column`} align={`center`}>
        <Flex direction={`row`} align={`center`} gap={`sm`}>
          <input
            type="checkbox"
            id={`isWorkingDay${day.id}`}
            name={`isWorkingDay${day.id}`}
            value={`${day.isWorked ? 'S' : 'N'}`}
            checked={day.isWorked}
            onChange={(e) => toggleWorkingDay(e.target.checked)}
          />

          <label htmlFor={`isWorkingDay${day.id}`}>Lavorativo</label>
        </Flex>
        <div>{day.isHoliday && <div>{`Festivo`}</div>}</div>
      </Flex>
    </Flex>
  )
}

export { GridITem }
