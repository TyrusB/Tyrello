window.Tyrello.Views.BoardIndexView = Backbone.View.extend({
  template: JST["boards/index"],

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
  },


  events: {
    "click #new-board-button":"toggleNewBoardForm"
  },

  render: function() {
    var content = this.template({
      boards: this.collection
    })

    this.$el.html(content);

    return this;
  },

  toggleNewBoardForm: function() {
    if ($('#new-board-container').children().length == 0) {
      this.renderNewBoardForm();
    } else {
      $('#new-form').toggle();
    }

    //this.listenTo(newBoardView, 'remove', this.render)
    var $newBoardButton = $('#new-board-button');
    if ($newBoardButton.text() === "Create a new Board") {
      $newBoardButton.text("Nevermind!");
    } else {
      $newBoardButton.text("Create a new Board");
    }

  },

  renderNewBoardForm: function() {
    var newBoardView = new Tyrello.Views.BoardNewView({
      collection: this.collection,
      indexView: this
    });

    $('#new-board-container').html(newBoardView.render().$el);
  }

})