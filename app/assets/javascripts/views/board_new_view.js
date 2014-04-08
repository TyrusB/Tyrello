window.Tyrello.Views.BoardNewView = Backbone.View.extend({
  template: JST['boards/new'],

  initialize: function(options) {
    this.indexView = options.indexView;
  },

  id: "new-form",

  events: {
    "submit form":"submit"
  },

  render: function() {
    var content = this.template({});
    this.$el.html(content);
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON()['board']
    var board = new Tyrello.Models.Board(params);
    var view = this;

    board.save({}, {
      success: function() {
        view.collection.add(board);
        view.indexView.toggleNewBoardForm();
      }
    })
  }
})