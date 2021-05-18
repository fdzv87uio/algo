import { makeStyles } from '@material-ui/core/styles'
import { CameraWrapperProps } from './FrontPoseCamera'

export const useStyles = makeStyles({
  cameraWrapper: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr',
    width: (props: CameraWrapperProps) => `url(${props.width})`,
    height: (props: CameraWrapperProps) => `url(${props.height})`,
  },
})
