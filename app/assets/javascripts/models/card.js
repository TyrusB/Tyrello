window.Trellino.Models.Card = Backbone.Model.extend({
  urlRoot: function() {
    if ( this.isNew() ) {
      return _.result(this.collection, 'url');
    } else {
      return "/cards";
    }
  },

  list: function () {
    return this.collection.list;
  },

  todos: function() {
    if (!this._todos) {
      this._todos = new Trellino.Collections.CardTodos([],{
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