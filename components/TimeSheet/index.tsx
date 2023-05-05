import { useState } from 'react'
import { getWorkingDaysByAutocompilation } from '../../utils/utils'
import { Grid } from '../Grid/Grid'
import { Day } from '../GridItem'
import { Flex } from '@mantine/core'

const current_date = new Date()

const initiaState: Day[] = getWorkingDaysByAutocompilation(current_date, false)

const TimeSheet: React.FunctionComponent<{}> = () => {
  const [days, setDays] = useState(initiaState)

  const [isAutoCompilation, setIsAutoCompilation] = useState(false)
  const [workedDays, setWorkedDays] = useState(0)
  const [workedHours, setWorkedHours] = useState(0)

  return (
    <div>
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
      <Flex direction={{ base: 'column' }} align={`end`}>
        <div>
          <p>Giorni Lavorati : {workedDays}</p>
          <p>Ore Lavorate : {workedHours}</p>
        </div>
      </Flex>
    </div>
  )
}

export { TimeSheet }
