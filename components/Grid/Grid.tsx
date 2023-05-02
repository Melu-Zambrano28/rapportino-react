import React from 'react'
import styles from './Grid.module.scss'
import { GridITem, Day } from '../GridItem/GridITem'

export type Month = {
  month: string
  year: number
  days: Day[]
  setAutoCompilation: (isAutoCompilation: boolean) => void
}

const Grid: React.FunctionComponent<Month> = ({
  month,
  year,
  days,
  setAutoCompilation,
}) => {
  const headlerAutoCompilation = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    setAutoCompilation(e.currentTarget.checked)
  }

  return (
    <div>
      <div className={styles.flexRowBetween}>
        <h1 className={`${styles.title}`}>
          {month} {year}
        </h1>
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
      <div className={styles.ggContainer}>
        {days.map((_, index) => (
          <GridITem
            key={`GG-ITem${index}`}
            day={_.day}
            weekDay={_.weekDay}
            WorkingHours={_.WorkingHours}
            isWeekend={_.isWeekend}
            isWorked={false}
          />
        ))}
      </div>
    </div>
  )
}

export { Grid }
