window.Tyrello.Collections.ListCards = Backbone.Collection.extend({
  model: Tyrello.Models.Card,
  //note, current API doesn't have a nested card index (or any card index)

  url: function() {
    return "/lists/" + this.list.id + "/cards"
  },

  initialize: function(models, options) {
    this.list = options.list;
  },

  comparator: function(card) {
    return card.get('rank');
  }

})

