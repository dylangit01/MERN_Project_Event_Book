import {makeStyles} from '@material-ui/core/styles'

export default makeStyles({
  about: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '71vh'
  },

  portLink: {
    // textDecoration: 'none',
    color: '#ecf4f3',
    cursor: 'pointer',
    marginBottom: '30px',
    lineHeight: '1.5',
    fontWeight: 'bold',
    fontSize: '2rem',
    '@media (max-width: 900px)' : {
      fontSize: '1.5rem'
    }
  },
})
