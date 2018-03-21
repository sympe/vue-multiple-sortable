# vue-multiple-sortable

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE.txt)

You sorting to with multiple selected elements in your Vue.js application.

![movie](https://user-images.githubusercontent.com/12382464/37713415-3cba7478-2d5a-11e8-9ff0-171629a0bceb.gif)

## Demo

https://sympe.github.io/vue-multiple-sortable-demo/dist/

## Usage
### Install

```bash
npm install --save vue-multiple-sortable
```

### A Single File Component Example
```html
<multiple-sortable :items="items" @drag="drag">
  <div slot="item" slot-scope="props">
      {{ ' 【' + props.obj.id + '】' +  props.obj.title }}
  </div>
</multiple-sortable>

<script>
import MultipleSortable from 'vue-multiple-sortable'

export default {
  components: {
    MultipleSortable
  },
  data: function () {
    return {
      items: [
        {
          obj: {
            id: 53,
            title: 'Michael'
          }
        },
        {
          obj: {
            id: 32,
            title: 'John'
          }
        },
        {
          obj: {
            id: 41,
            title: 'Daniel'
          }
        },
        {
          obj: {
            id: 29,
            title: 'Andrew'
          }
        }
      ]
    };
  },
  methods: {
    drag: function (items) {
      this.items = items;
    }
  }
};
</script>
```

## License
MIT