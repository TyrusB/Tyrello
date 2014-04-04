window.Trellino.Collections.BoardLists = Backbone.Collection.extend({
  model: Trellino.Models.List,

  url: function() {
    return "/boards/" + this.board.id + "/lists";
  },

  initialize: function(models, options) {
    this.board = options.board;
  },

  comparator: function(list) {
    return list.get('rank');
  }

})

