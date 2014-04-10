window.Tyrello.Views.CardModalView = Backbone.View.extend({
  template: JST["cards/modal"],

  events: {
    "click #add-todo-button":"newTodoToggle",
    "submit .description-form":"saveDescription"
  },

  render: function() {
    var content = this.template({
      card: this.model
    });

    this.$el.html(content);

    return this;
  },

  initialize: function() {
    // this.listenTo(this.model, 'sync', this.render)
    this.listenTo(this.model.todos(), 'add', this.addTodo)
  },

  newTodoToggle: function() {
    $container = $('#add-todo-container')

    if ($container.children().length == 0) {
      var newTodoForm = new Tyrello.Views.TodoNewView({
        card_id: this.model.id,
        collection: this.model.todos(),
        parent: this
      });

      $container.html(newTodoForm.render().$el);

      $("#add-todo-button").toggle();

    } else {
      $('#add-todo-container').toggle();
      $('#add-todo-button').toggle();
    }
  },

  addTodo: function(todo) {
    var $todo = $('<li>' + todo.escape('title') + " <input type='checkbox'></li>");

    $($todo).insertBefore( $(this.$('#add-todo-button')) );
  },

  saveDescription: function(event) {
    event.preventDefault();
    view = this;
    var description = this.$('.description-form').serializeJSON();

    this.model.save(description, {
      patch: true,
      success: function() {
        this.$('#description-holder').html(view.model.escape('description'));
      }
    })
  }
})