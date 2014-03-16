window.Trellino.Collections.ListCards = Backbone.Collection.extend({
  model: Trellino.Models.Card,
  //note, current API doesn't have a nested card index (or any card index)
  url: "/cards",

  initialize: function(models, options) {
    this.list = options.list;
  }

})

