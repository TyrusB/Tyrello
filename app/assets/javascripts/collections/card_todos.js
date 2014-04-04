window.Trellino.Collections.CardTodos = Backbone.Collection.extend({
  model: Trellino.Models.Todo,

  url: function() {
    return "/cards/" + this.card.id + "/todo_items"
  },

  initialize: function(models, options) {
    this.card = options.card;
  }

})

