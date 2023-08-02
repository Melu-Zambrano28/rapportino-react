import React from 'react'
import { GridITem, Day } from '../GridItem'
import { Box, Flex, SimpleGrid, Title } from '@mantine/core'
import {
  countWorkedDaysCounter,
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

  const handleAutoCompilation = (checkCompilation: boolean) => {
    const days = getWorkingDaysByAutocompilation(new Date(), checkCompilation)

    const counters = countWorkedDaysCounter(days)

    setDays(days)
    setAutoCompilation(checkCompilation)
    setWorkedDays(counters.workedDays)
    setWorkedHours(counters.workedHous)
  }

  const setSingleDay = (day: Day) => {
    const newDays = days.map((item) => {
      if (item.id === day.id) {
        return { ...item, ...day }
      }
      return item
    })
    const counters = countWorkedDaysCounter(newDays)
    setDays(newDays)
    setWorkedDays(counters.workedDays)
    setWorkedHours(counters.workedHous)
  }

  return (
    <Box>
      <Flex direction={`row`} justify={`space-between`} align={`center`}>
        <Title order={1} ta={`left`} tt={`capitalize`} mb={20}>
          {month} {year}
        </Title>
        <Box>
          <input
            type="checkbox"
            id="completeTimeshet"
            name="completeTimeshet"
            defaultChecked={false}
            onChange={(e) => handleAutoCompilation(e.target.checked)}
          />
          <label htmlFor="completeTimeshet"> Compila Rapportino</label>
          <br />
        </Box>
      </Flex>
      <SimpleGrid
        cols={7}
        breakpoints={[
          { maxWidth: 'md', cols: 5, spacing: 'md' },
          { maxWidth: 'sm', cols: 2, spacing: 'sm' },
          { maxWidth: 'xs', cols: 3, spacing: 'sm' },
        ]}
      >
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
    </Box>
  )
}

export { Grid }
