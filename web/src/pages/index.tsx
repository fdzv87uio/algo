import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import React from 'react'
import Link from 'next/link'

import { Box, Grid } from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'
import CarouselItem from '../common/CarouselItem/CarouselItem'
import { makeStyles } from '@material-ui/core/styles'

const doodle1 = '/images/doodle1.png'
const doodle2 = '/images/doodle2.png'
const doodle3 = '/images/doodle3.png'

const Items = [
  {
    key: 1,
    text: "It's a simple three step process",
    image: doodle1,
  },
  {
    key: 2,
    text: 'We capture two photos',
    image: doodle2,
  },
  {
    key: 3,
    text: 'And your fit preferences...',
    image: doodle3,
  },
]

const useStyles = makeStyles({
  container: {
    backgroundColor: '#e2d029',
  },
  bottom: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  carouselContainer: {
    borderRadius: '0px 0px 15px 15px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 20px 15px -15px gray',
  },
  carousel: {
    borderRadius: '0px 0px 15px 15px',
  },
})

export default function Index(): JSX.Element {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <Box className={classes.carouselContainer}>
          <Carousel className={classes.carousel}>
            {Items.map((item, i) => (
              <CarouselItem key={i} image={item.image} text={item.text} />
            ))}
          </Carousel>
        </Box>
      </Grid>
      <Grid container justify="center" item xs={12} className={classes.bottom}>
        <Link href="/pose-selection">
          <a>Get Started&nbsp;</a>
        </Link>
        <ArrowForwardIcon fontSize="small" />
      </Grid>
    </Grid>
  )
}
