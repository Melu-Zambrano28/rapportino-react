import { useState } from 'react'
import {
  countSickDays,
  getWorkingDaysByAutocompilation,
} from '../../utils/utils'
import { Grid } from '../Grid/Grid'
import { Day } from '../GridItem'
import { Box, Divider, Flex, Title } from '@mantine/core'

const current_date = new Date()

const initiaState: Day[] = getWorkingDaysByAutocompilation(current_date, false)

export type Month = {
  idMonth: string
  year: number
  days: Day[]
  isAutocompilation: boolean
  workedDays: number
  workedHous: number
}

const TimeSheet: React.FunctionComponent<{}> = () => {
  const [month, setMonth] = useState<Month>({
    idMonth: current_date.toLocaleDateString('it-IT', {
      month: 'long',
    }),
    year: current_date.getFullYear(),
    days: initiaState,
    isAutocompilation: false,
    workedDays: 0,
    workedHous: 0,
  })

  const handleSingleCell = (newState: Month) => {
    setMonth({
      ...month,
      ...newState,
    })
  }

  const sickDays = countSickDays(month.days)

  return (
    <Flex direction={`row`} gap={5}>
      <Box sx={{ maxWidth: `80%` }}>
        <Grid month={month} handleMonth={handleSingleCell} />
      </Box>
      <Divider orientation="vertical" />
      <Box sx={{ maxWidth: `20%` }}>
        <Flex direction={{ base: 'column' }}>
          <Title order={1} ta={`center`} tt={`capitalize`} mb={20}>
            Totale
          </Title>
          <Box>
            <p>Giorni Lavorati : {month.workedDays}</p>
            <p>Ore Lavorate : {month.workedHous}</p>
            <p>Malattia: {sickDays}</p>
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

export { TimeSheet }
