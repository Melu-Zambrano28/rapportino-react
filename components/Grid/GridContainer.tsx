import { useEffect, useState } from 'react'
import {
  countWorkedDays,
  countWorkedHours,
  getAllDates,
  getWorkingDaysByAutocompilation,
} from '../../utils/utils'
import { Grid } from './Grid'
import { Day } from '../GridItem/GridITem'
import styles from './Grid.module.scss'

const GridContainer: React.FunctionComponent<{}> = () => {
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
  const [giorni, setGiorni] = useState<Day[]>(initiaState)
  const [isAutoCompilation, setIsAutoCompilation] = useState(false)
  const [workedDays, setWorkedDays] = useState(0)
  const [workedHours, setWorkedHours] = useState(0)

  useEffect(() => {
    if (isAutoCompilation) {
      const resultWorkedDays = countWorkedDays(stateWithAutocompilation)
      const resultWorkedHours = countWorkedHours(stateWithAutocompilation)

      setGiorni(stateWithAutocompilation)
      setWorkedDays(resultWorkedDays)
      setWorkedHours(resultWorkedHours)
    } else {
      setGiorni(initiaState)
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
        days={giorni}
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
