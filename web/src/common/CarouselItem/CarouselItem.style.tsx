import { makeStyles } from '@material-ui/core/styles'
import { CarouselItemProps } from './CarouselItem'

const carouselStyles = makeStyles({
  root: {
    height: '85vh',
    backgroundImage: (props: CarouselItemProps) => `url(${props.image})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    boxShadow: 'none !important',
  },
  text: {
    fontFamily: 'Montserrat',
    color: '#1958BC',
    fontSize: '1.5rem',
    padding: 20,
  },
})

export default carouselStyles
