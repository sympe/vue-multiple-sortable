module.exports = {
  install: function(Vue, options) {
    Vue.component('multiple-sortable', require(MultipleSortable));
  }
};