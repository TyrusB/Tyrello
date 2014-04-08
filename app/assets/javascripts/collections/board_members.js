window.Tyrello.Collections.BoardMembers = Backbone.Collection.extend({
  model: Tyrello.Models.Member,

  url: "/users",

  intitialize: function(members, options) {
    this.board = options.board
  }
})