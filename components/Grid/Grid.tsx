import React from 'react'
import styles from './Grid.module.scss'
import { GridITem, Day } from '../GridItem'
import { useAtom } from 'jotai'
import { autoCompilationAtom } from './atoms/GridAtoms'

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

  const [isAutoCompilation] = useAtom(autoCompilationAtom)

  return (
    <div>
      <div className={styles.flexRowBetween}>
        <h1 className={`${styles.title}`}>
          {month} {year}
        </h1>
        <div>
          <input
            type="checkbox"
            id="completeTimeshet"
            name="completeTimeshet"
            value={`${isAutoCompilation ? 'S' : 'N'}`}
            defaultChecked={isAutoCompilation}
            onClick={(e) => headlerAutoCompilation(e)}
          />
          <label htmlFor="completeReport"> Compila Rapportino</label>
          <br />
        </div>
      </div>
      <div className={styles.ggContainer}>
        {days.map((_, index) => (
          <GridITem
            key={`GG-ITem${index}`}
            id={_.id}
            date={_.date}
            WorkingHours={_.WorkingHours}
            isWeekend={_.isWeekend}
            isWorked={_.isWorked}
            isHoliday={_.isHoliday}
          />
        ))}
      </div>
    </div>
  )
}

export { Grid }
