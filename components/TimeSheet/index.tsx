import { useEffect, useState } from 'react'
import {
  countWorkedDays,
  countWorkedHours,
  getWorkingDaysByAutocompilation,
} from '../../utils/utils'
import { Grid } from '../Grid/Grid'
import { Day } from '../GridItem'
import { useAtom } from 'jotai'
import {
  autoCompilationAtom,
  daysAtom,
  workedDaysAtom,
  workedHoursAtom,
} from '../Grid/atoms/GridAtoms'

const current_date = new Date()

const initiaState: Day[] = getWorkingDaysByAutocompilation(current_date, false)
const stateWithAutocompilation: Day[] = getWorkingDaysByAutocompilation(
  current_date,
  true,
)

const TimeSheet: React.FunctionComponent<{}> = () => {
  const [days, setDays] = useState(initiaState)

  const [isAutoCompilation, setIsAutoCompilation] = useState(false)
  const [workedDays, setWorkedDays] = useState(0)
  const [workedHours, setWorkedHours] = useState(0)

  useEffect(() => {
    if (isAutoCompilation) {
      const resultWorkedDays = countWorkedDays(stateWithAutocompilation)
      const resultWorkedHours = countWorkedHours(stateWithAutocompilation)

      setDays(stateWithAutocompilation)
      setWorkedDays(resultWorkedDays)
      setWorkedHours(resultWorkedHours)
    } else {
      setDays(initiaState)
      setWorkedDays(0)
      setWorkedHours(0)
    }
  }, [isAutoCompilation, workedDays, workedHours])

  return (
    <div>
      <Grid
        month={current_date.toLocaleDateString('it-IT', {
          month: 'long',
        })}
        year={current_date.getFullYear()}
        days={days}
        setAutoCompilation={setIsAutoCompilation}
        setDays={setDays}
      />
      <div className={`flexColumnEnd`}>
        <div>
          <p>Giorni Lavorati : {workedDays}</p>
          <p>Ore Lavorate : {workedHours}</p>
        </div>
      </div>
    </div>
  )
}

export { TimeSheet }
