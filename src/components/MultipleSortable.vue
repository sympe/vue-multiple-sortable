<template>
  <div>
    <div :class="{selected: item.isSelected}" draggable="true" @dragstart="dragstart(item, $event)" @dragend="dragend" @dragenter="dragenter(item, $event)" @click="select(item)" v-for="item in items" :key="item.index">
      <slot name="item" :title='item.title' :id='item.id' :keyword='item.keyword' :description='item.description'></slot>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'multi-select-sortable',
  props: ['items'],
  data: function () {
    return {
      selectedItems: {},
      beforeY: 0,
      slotText: ":names='item.name' :id='item.id'"
    };
  },
  computed: {
    orderedItems: function () {
      return _.orderBy(this.items, 'index');
    }
  },
  methods: {
    select: function (item) {
      if (this.selectedItems[item.index]) {
        this.deleteSelectedItems(item);
        return;
      }

      var minIndexInSelectedItems = Math.min.apply(null, Object.keys(this.selectedItems));
      var maxIndexInSelectedItems = Math.max.apply(null, Object.keys(this.selectedItems));

      if ((item.index !== minIndexInSelectedItems - 1) && (item.index !== maxIndexInSelectedItems + 1) && Object.keys(this.selectedItems).length !== 0) {
        return;
      }

      this.addSelectedItems(item);
    },
    addSelectedItems: function (item) {
      this.selectedItems[item.index] = item;
      this.items[item.index].isSelected = true;
      console.log(this.selectedItems);
    },
    deleteSelectedItems: function (item) {
      this.items[item.index].isSelected = false;
      delete this.selectedItems[item.index];
    },
    dragstart: function (item, event) {
      if (!(item.index in this.selectedItems)) {
        for (var key in this.selectedItems) {
          this.deleteSelectedItems(this.selectedItems[key]);
        }
        this.addSelectedItems(item);
      }

      this.beforeY = event.pageY;
    },
    dragenter: function (item, event) {
      for (var key in this.selectedItems) {
        if (this.selectedItems[key].index === item.index) {
          return;
        }
      }

      if (event.pageY < this.beforeY) {
        item.index += Object.keys(this.selectedItems).length;
        this.$emit('drag', this.orderedItems);
        for (var key in this.selectedItems) {
          this.selectedItems[key].index -= 1;
          this.$emit('drag', this.orderedItems);
        }
      } else {
        item.index -= Object.keys(this.selectedItems).length;
        this.$emit('drag', this.orderedItems);
        for (var key in this.selectedItems) {
          this.selectedItems[key].index += 1;
          this.$emit('drag', this.orderedItems);
        }
      }

      this.beforeY = event.pageY;
    },
    dragend: function (event) {
      for (var key in this.items) {
        this.items[key].isSelected = false;
      }
      this.selectedItems = {};
    }
  },
  created: function () {
    for (var key in this.items) {
      this.$set(this.items[key], 'isSelected', false);
      this.$set(this.items[key], 'index', Number(key));
    }
  }
};
</script>

<style>
.selected {
  border: medium solid #4F99C6;
}
</style>
