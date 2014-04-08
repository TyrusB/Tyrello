window.Tyrello.Models.Card = Backbone.Model.extend({
  urlRoot: "/cards",

  initialize: function(options) {
    // this.list = options.list
  },

  list: function () {
    return this.collection.list;
  },

  todos: function() {
    if (!this._todos) {
      this._todos = new Tyrello.Collections.CardTodos([],{
        card: this
      });
    }

    return this._todos
  },

  parse: function(jsonResp) {
    if (jsonResp.todos) {
      this.todos().set(jsonResp.todos);
      delete jsonResp.s;
    }

    return jsonResp;
  }


});