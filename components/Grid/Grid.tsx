import React from 'react'
import { GridITem, Day } from '../GridItem'
import { Box, Flex, SimpleGrid, Title } from '@mantine/core'
import {
  countWorkedDaysCounter,
  getWorkingDaysByAutocompilation,
} from '../../utils/utils'
import { Month } from '../TimeSheet'

type TimeSheet = {
  month: Month
  handleMonth: (a: Month) => void
}

const Grid: React.FunctionComponent<TimeSheet> = ({ month, handleMonth }) => {
  const { days, idMonth, year } = month

  const handleAutoCompilation = (checkCompilation: boolean) => {
    const days = getWorkingDaysByAutocompilation(new Date(), checkCompilation)

    const counters = countWorkedDaysCounter(days)

    handleMonth({
      ...month,
      days: days,
      isAutocompilation: checkCompilation,
      workedDays: counters.workedDays,
      workedHous: counters.workedHous,
    })
  }

  const setSingleDay = (day: Day) => {
    const newDays = days.map((item) => {
      if (item.id === day.id) {
        return { ...item, ...day }
      }
      return item
    })
    const counters = countWorkedDaysCounter(newDays)
    handleMonth({
      ...month,
      days: newDays,
      workedDays: counters.workedDays,
      workedHous: counters.workedHous,
    })
  }

  return (
    <Box>
      <Flex direction={`row`} justify={`space-between`} align={`center`}>
        <Title order={1} ta={`left`} tt={`capitalize`} mb={20}>
          {idMonth} {year}
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
              isSickDay: _.isSickDay,
            }}
            handleDay={setSingleDay}
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export { Grid }
