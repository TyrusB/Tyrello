window.Trellino.Models.Todo = Backbone.Model.extend({
  urlRoot: function() {
    if ( this.isNew() ) {
      return _.result(this.collection, 'url');
    } else {
      return "/todo_items";
    }
  },
})