import indigo from '@material-ui/core/colors/indigo';


export default {
  root: {
    '&$selected': {
      color: indigo[500]
    },
    '&$hover': {
      '&:hover': {
        backgroundColor: 'red'
      }
    },
    
  }
};