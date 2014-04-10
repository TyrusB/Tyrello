window.Tyrello.Views.BoardIndexView = Backbone.View.extend({
  template: JST["boards/index"],

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
  },


  events: {
    "click #new-board-button":"toggleNewBoardForm",
    "click .cancel":"toggleNewBoardForm",
    "submit .new-board-form":"saveBoard"
  },

  render: function() {
    var content = this.template({
      boards: this.collection
    })

    this.$el.html(content);

    return this;
  },

  toggleNewBoardForm: function(event) {
    event.preventDefault();

    $('#new-board-button').toggle();
    $('#new-board-container').toggle();

  },

  saveBoard: function(event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON()['board']
    var board = new Tyrello.Models.Board(params);
    var view = this;
    board.collection = this.collection;

    board.save({}, {
      success: function() {
        view.collection.add(board);
        view.toggleNewBoardForm(event);
      }
    })
  }

})