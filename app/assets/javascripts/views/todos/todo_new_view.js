window.Trellino.Views.TodoNewView = Backbone.View.extend({
  template: JST["todos/new"],

  tagName: "form",

  events: {
    "click button#new-todo-submit":"submit",
    "click button#new-todo-cancel":"cancel"
  },

  initialize: function(options) {
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

    var todo = new Trellino.Models.Todo({
      title: title
    });
    todo.collection = this.collection
    
    todo.save({ todo: { "title":title } },{
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