import { useEffect } from 'react'
import {
  countWorkedDays,
  countWorkedHours,
  getAllDates,
  getWorkingDaysByAutocompilation,
} from '../../utils/utils'
import { Grid } from './Grid'
import { Day } from '../GridItem/GridITem'
import styles from './Grid.module.scss'
import { useAtom } from 'jotai'
import {
  autoCompilationAtom,
  daysAtom,
  workedDaysAtom,
  workedHoursAtom,
} from './atoms/GridAtoms'

const current_date = new Date()

const allDates = getAllDates(
  current_date.getFullYear(),
  current_date.getMonth(),
)

const initiaState: Day[] = getWorkingDaysByAutocompilation(allDates, false)
const stateWithAutocompilation: Day[] = getWorkingDaysByAutocompilation(
  allDates,
  true,
)

const GridContainer: React.FunctionComponent<{}> = () => {
  const [days, setDays] = useAtom(daysAtom)

  const [isAutoCompilation, setIsAutoCompilation] = useAtom(autoCompilationAtom)
  const [workedDays, setWorkedDays] = useAtom(workedDaysAtom)
  const [workedHours, setWorkedHours] = useAtom(workedHoursAtom)

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
  }, [isAutoCompilation, workedDays])

  return (
    <div>
      <Grid
        month={current_date.toLocaleDateString('it-IT', {
          month: 'long',
        })}
        year={current_date.getFullYear()}
        days={days}
        setAutoCompilation={setIsAutoCompilation}
      />
      <div className={`${styles.flexColumnEnd}`}>
        <div>
          <p>Giorni Lavorati : {workedDays}</p>
          <p>Ore Lavorate : {workedHours}</p>
        </div>
      </div>
    </div>
  )
}

export { GridContainer }
