import { useState } from 'react'
import { getAllDates } from '../../utils/utils'
import { Grid } from './Grid'
import { Giorno } from '../GridItem/GridITem'

const GridContainer: React.FunctionComponent<{}> = () => {
  const current_date = new Date()

  const allDates = getAllDates(
    current_date.getFullYear(),
    current_date.getMonth(),
  )
  const giorniMese: Giorno[] = allDates.map((_) => {
    return {
      day: current_date.getDate() + 1,
      weekDay: _.toLocaleString('it-IT', {
        weekday: 'long',
        day: '2-digit',
      }),
      WorkingHours: 0,
      isWeekend: false,
    }
  })

  const [giorni, setGiorni] = useState<Giorno[]>(giorniMese)

  return (
    <Grid
      nome={current_date.toLocaleDateString('it-IT', {
        month: 'long',
      })}
      giorni={giorni}
    />
  )
}

export { GridContainer }
