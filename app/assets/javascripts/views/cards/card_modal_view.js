window.Trellino.Views.CardModalView = Backbone.View.extend({
  template: JST["cards/modal"],

  events: {
    "click #add-todo-button":"newTodoToggle"
  },

  render: function() {
    var content = this.template({
      card: this.model
    });

    this.$el.html(content);

    return this;
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render)
  },

  newTodoToggle: function() {
    $container = $('#add-todo-container')

    if ($container.children().length == 0) {
      var newTodoForm = new Trellino.Views.TodoNewView({
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
})