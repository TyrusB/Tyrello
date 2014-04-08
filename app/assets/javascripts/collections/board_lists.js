window.Tyrello.Collections.BoardLists = Backbone.Collection.extend({
  model: Tyrello.Models.List,

  url: function() {
    return this.board.url() + "/lists";
  },

  initialize: function(models, options) {
    this.board = options.board;
  },

  comparator: function(list) {
    return list.get('rank');
  }

})

