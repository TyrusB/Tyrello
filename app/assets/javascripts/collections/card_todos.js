window.Trellino.Collections.CardTodos = Backbone.Collection.extend({
  model: Trellino.Models.Todo,

  url: function() {
    return "/lists/" + this.card.id + "/todo_items"
  },

  initialize: function(models, options) {
    this.card = options.card;
  }

})

