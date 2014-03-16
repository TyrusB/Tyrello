window.Trellino.Collections.BoardMembers = Backbone.Collection.extend({
  model: Trellino.Models.Member,

  url: "/users",

  intitialize: function(members, options) {
    this.board = options.board
  }
})