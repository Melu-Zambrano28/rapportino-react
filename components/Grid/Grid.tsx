import React from 'react'
import styles from './Grid.module.scss'
import { GridITem, Day } from '../GridItem'
import { SimpleGrid } from '@mantine/core'
import {
  countWorkedDays,
  countWorkedHours,
  getWorkingDaysByAutocompilation,
} from '../../utils/utils'

type TimeSheetStates = {
  setAutoCompilation: (a: boolean) => void
  setDays: (d: Day[]) => void
  setWorkedDays: (n: number) => void
  setWorkedHours: (n: number) => void
}

export type Month = {
  month: string
  year: number
  days: Day[]
  TimeSheetStates: TimeSheetStates
}

const Grid: React.FunctionComponent<Month> = ({
  month,
  year,
  days,
  TimeSheetStates,
}) => {
  const { setAutoCompilation, setDays, setWorkedDays, setWorkedHours } =
    TimeSheetStates

  const headlerAutoCompilation = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    const days = getWorkingDaysByAutocompilation(
      new Date(),
      e.currentTarget.checked,
    )

    const resultWorkedDays = countWorkedDays(days)
    const resultWorkedHours = countWorkedHours(days)

    setDays(days)
    setAutoCompilation(e.currentTarget.checked)
    setWorkedDays(resultWorkedDays)
    setWorkedHours(resultWorkedHours)
  }

  const isAutoCompilation = false

  const setSingleDay = (day: Day) => {
    const newDays = days.map((item) => {
      if (item.id === day.id) {
        return { ...item, ...day }
      }
      return item
    })
    setDays(newDays)
  }

  return (
    <div>
      <div className={styles.flexRowBetween}>
        <h1 className={`${styles.title}`}>
          {month} {year}
        </h1>
        <div>
          <input
            type="checkbox"
            id="completeTimeshet"
            name="completeTimeshet"
            value={`${isAutoCompilation ? 'S' : 'N'}`}
            defaultChecked={isAutoCompilation}
            onClick={(e) => headlerAutoCompilation(e)}
          />
          <label htmlFor="completeTimeshet"> Compila Rapportino</label>
          <br />
        </div>
      </div>
      <SimpleGrid cols={7}>
        {days.map((_, index) => (
          <GridITem
            key={`GG-ITem${index}`}
            day={{
              id: _.id,
              date: _.date,
              WorkingHours: _.WorkingHours,
              isWeekend: _.isWeekend,
              isWorked: _.isWorked,
              isHoliday: _.isHoliday,
            }}
            handleDay={setSingleDay}
          />
        ))}
      </SimpleGrid>
    </div>
  )
}

export { Grid }
