window.Tyrello.Views.TodoNewView = Backbone.View.extend({
  template: JST["todos/new"],

  tagName: "form",

  events: {
    "click button#new-todo-submit":"submit",
    "click button#new-todo-cancel":"cancel"
  },

  initialize: function(options) {
    this.card_id = options.card_id;
    this.parent = options.parent;
  },

  render: function() {
    var content = this.template();

    this.$el.html(content);
    return this
  },

  submit: function() {
    var view = this;

    var name = $('#todo-name').val();

    var todo = new Tyrello.Models.Todo({
      name: name,
      card_id: this.card_id
    });

    todo.collection = this.collection
    debugger
    todo.save({},{
      success: function() {
        view.collection.add(todo);
        //make this form dissapear...
        view.parent.newTodoToggle();
        this.$('form')[0].reset();
      }
    });
  },

  cancel: function() {
    //this.collection.trigger("add");
    // try to avoid if possible
    // call event on collection
    this.parent.newListToggle();
  }
})