window.Trellino.Collections.BoardMembers = Backbone.Collection.extend({
  model: Trellino.Models.User,

  initialize: function(options) {
    this.board = options.board;
  },

  url: function() {
    "/boards/" + this.board.id + "/users"
  }

});