import { useState } from 'react'
import { getWorkingDaysByAutocompilation } from '../../utils/utils'
import { Grid } from '../Grid/Grid'
import { Day } from '../GridItem'
import { Box, Divider, Flex, Title } from '@mantine/core'

const current_date = new Date()

const initiaState: Day[] = getWorkingDaysByAutocompilation(current_date, false)

const TimeSheet: React.FunctionComponent<{}> = () => {
  const [days, setDays] = useState(initiaState)

  const [isAutoCompilation, setIsAutoCompilation] = useState(false)
  const [workedDays, setWorkedDays] = useState(0)
  const [workedHours, setWorkedHours] = useState(0)

  return (
    <Flex
      direction={{ sm: 'column', md: 'row' }}
      gap={{ base: 'sm', sm: 'lg' }}
      justify={`center`}
    >
      <Grid
        month={current_date.toLocaleDateString('it-IT', {
          month: 'long',
        })}
        year={current_date.getFullYear()}
        days={days}
        TimeSheetStates={{
          setDays: setDays,
          setAutoCompilation: setIsAutoCompilation,
          setWorkedDays: setWorkedDays,
          setWorkedHours: setWorkedHours,
        }}
      />
      <Divider orientation="vertical" />

      <Flex direction={{ base: 'column' }}>
        <Title order={1} ta={`center`} tt={`capitalize`} mb={20}>
          Totale
        </Title>
        <Box>
          <p>Giorni Lavorati : {workedDays}</p>
          <p>Ore Lavorate : {workedHours}</p>
        </Box>
      </Flex>
    </Flex>
  )
}

export { TimeSheet }
