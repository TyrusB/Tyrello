window.Tyrello.Views.TodoNewView = Backbone.View.extend({
  template: JST["todos/new"],

  tagName: "form",

  className: "new-todo-form",

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

    var title = $('#todo-name').val();

    var todo = new Tyrello.Models.Todo({
      title: title
    });

    todo.collection = this.collection

    todo.save({},{
      success: function() {
        view.collection.add(todo);
        //make this form dissapear...
        view.parent.newTodoToggle();
        $('.new-todo-form')[0].reset();
      }
    });
  },

  cancel: function() {
    //this.collection.trigger("add");
    // try to avoid if possible
    // call event on collection
    this.parent.newTodoToggle();
  }
})