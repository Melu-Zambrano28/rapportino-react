import { useEffect, useState } from 'react'
import { getAllDates } from '../../utils/utils'
import { Grid } from './Grid'
import { Giorno } from '../GridItem/GridITem'

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

  const initiaState: Giorno[] = getWorkingDaysByAutocompilation(false)
  const stateWithAutocompilation: Giorno[] =
    getWorkingDaysByAutocompilation(true)
  const [giorni, setGiorni] = useState<Giorno[]>(initiaState)
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
      nome={current_date.toLocaleDateString('it-IT', {
        month: 'long',
      })}
      giorni={giorni}
      setAutoCompilation={setIsAutoCompilation}
    />
  )
}

export { GridContainer }
