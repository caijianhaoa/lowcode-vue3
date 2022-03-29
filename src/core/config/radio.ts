
import common from './common';

export default {
  ...common,
  props: {
    value: '',
    size: 'large',
    buttonStyle: 'outline'
  },
  mock:{
    defaultValue: '',
    defaultList: [
      {
        value: 1,
        label: '是'
      },
      {
        value: 0,
        label: '否'
      }
    ]
  }
}