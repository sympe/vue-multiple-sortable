# vue-multiple-sortable
You sorting to with multiple selected elements in your Vue.js application.

## Installation

```bash
npm install vue-multiple-sortable
```

## Demo

https://sympe.github.io/vue-multiple-sortable-demo/dist/

## Usage

### Simple component
In a template

```javascript
<multiple-sortable :items="items" @drag="drag">
  <div slot="item" slot-scope="props">
      {{ ' 【' + props.obj.id + '】' +  props.obj.title }}
  </div>
</multiple-sortable>
```

In a script

```javascript
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