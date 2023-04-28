import { useEffect, useState } from 'react'
import { getAllDates } from '../../utils/utils'
import { Grid } from './Grid'
import { Day } from '../GridItem/GridITem'

const GridContainer: React.FunctionComponent<{}> = () => {
  const current_date = new Date()

  const allDates = getAllDates(
    current_date.getFullYear(),
    current_date.getMonth(),
  )

  const getWorkingDaysByAutocompilation = (autoCompilation: boolean) => {
    return allDates.map((_) => {
      const day = _.getDay() + 1
      const isWeekEnd = day === 1 || day === 7
      return {
        day: current_date.getDate() + 1,
        weekDay: _.toLocaleString('it-IT', {
          weekday: 'long',
          day: '2-digit',
        }),
        WorkingHours: autoCompilation && !isWeekEnd ? 8 : 0,
        isWeekend: autoCompilation && isWeekEnd,
      }
    })
  }

  const initiaState: Day[] = getWorkingDaysByAutocompilation(false)
  const stateWithAutocompilation: Day[] = getWorkingDaysByAutocompilation(true)
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
    <Grid
      month={current_date.toLocaleDateString('it-IT', {
        month: 'long',
      })}
      days={giorni}
      setAutoCompilation={setIsAutoCompilation}
    />
  )
}

export { GridContainer }
