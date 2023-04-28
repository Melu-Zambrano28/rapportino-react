import React from 'react'
import style from './Grid.module.scss'
import { GridITem, Giorno } from '../GridItem/GridITem'

export type GridProp = {
  nome: string
  giorni: Giorno[]
  setAutoCompilation: (isAutoCompilation: boolean) => void
}

const Grid: React.FunctionComponent<GridProp> = ({
  nome,
  giorni,
  setAutoCompilation,
}) => {
  const headlerAutoCompilation = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    setAutoCompilation(e.currentTarget.checked)
  }

  return (
    <div>
      <div className={style.flexRowBetween}>
        <h1 className={`${style.title}`}>{nome}</h1>
        <div>
          <input
            type="checkbox"
            id="compilaRapportino"
            name="compilaRapportino"
            value="S"
            onClick={(e) => headlerAutoCompilation(e)}
          />
          <label htmlFor="compilaRapportino"> Compila Rapportino</label>
          <br />
        </div>
      </div>
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
