import React from 'react'
import { Paper } from '@material-ui/core'
import carouselStyles from './CarouselItem.style'

export interface CarouselItemProps {
  text: string
  key: number
  image: any
}

export default function CarouselItem(props: CarouselItemProps): JSX.Element {
  const classes = carouselStyles(props)

  return (
    <Paper className={classes.root}>
      <div className={classes.text}>{props.text}</div>
    </Paper>
  )
}
