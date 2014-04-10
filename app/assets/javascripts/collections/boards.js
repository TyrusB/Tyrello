window.Tyrello.Collections.Boards = Backbone.Collection.extend({
  url: "/boards",

  model: Tyrello.Models.Board

  initialize: function(options) {
    this.user = options.user;
  }
})

