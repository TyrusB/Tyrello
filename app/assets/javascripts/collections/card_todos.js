window.Tyrello.Collections.CardTodos = Backbone.Collection.extend({
  model: Tyrello.Models.Todo,

  url: function() {
    return "/cards/" + this.card.id + "/todo_items"
  },

  initialize: function(models, options) {
    this.card = options.card;
  }

})

