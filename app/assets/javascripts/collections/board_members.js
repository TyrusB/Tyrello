window.Tyrello.Collections.BoardMembers = Backbone.Collection.extend({
  model: Tyrello.Models.Member,


  initialize: function(options) {
    this.board = options.board;
  },

  url: function() {
    "/boards/" + this.board.id + "/users"
  }

});
