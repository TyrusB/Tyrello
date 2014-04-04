window.Trellino.Collections.Boards = Backbone.Collection.extend({
  url: "/boards",

  model: Trellino.Models.Board,

  initialize: function(options) {
    this.user = options.user;
  }
})

