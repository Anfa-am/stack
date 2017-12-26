import Axios from 'axios'
import store from '../stores'

export function sampleAction(){
  return function (dispatch) {
    dispatch({ type: 'DISPATCH_ACTION', payload: { show: false } })
  }
}
