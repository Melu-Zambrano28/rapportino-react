import React from 'react'
import style from './Grid.module.scss'
import { GridITem, Giorno } from '../GridItem/GridITem'

export type GridProp = {
  nome: string
  giorni: Giorno[]
}

const Grid: React.FunctionComponent<GridProp> = ({ nome, giorni }) => {
  return (
    <div>
      <h1 className={`${style.title}`}>{nome}</h1>
      <div className={style.ggContainer}>
        {giorni.map((_, index) => (
          <GridITem
            key={`GG${index}`}
            day={_.day}
            weekDay={_.weekDay}
            WorkingHours={_.WorkingHours}
            isWeekend={_.isWeekend}
          />
        ))}
      </div>
    </div>
  )
}

export { Grid }
