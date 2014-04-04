window.Trellino.Collections.ListCards = Backbone.Collection.extend({
  model: Trellino.Models.Card,

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

