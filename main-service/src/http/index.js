import host from './host';
import {get,post} from './api'
const mockServiceList = require('../mock/subServices')
export default {
  getServiceList(){
      return Promise.resolve(mockServiceList)
  }
}
