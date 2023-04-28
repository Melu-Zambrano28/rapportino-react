import { useEffect, useState } from 'react'
import { getAllDates, getWorkingDaysByAutocompilation } from '../../utils/utils'
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

  useEffect(() => {
    if (isAutoCompilation) {
      setGiorni(stateWithAutocompilation)
    } else {
      setGiorni(initiaState)
    }
  }, [isAutoCompilation])

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
          <p>Giorni Lavorati : </p>
        </div>
      </div>
    </div>
  )
}

export { GridContainer }
