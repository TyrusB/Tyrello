window.Tyrello.Views.ListNewView = Backbone.View.extend({
  tagName: 'form',

  template: JST["lists/new"],

  initialize: function(options) {
    this.parent = options.parent
  },

  events: {
    "click button#new-list-submit":"submit",
    "click button#new-list-cancel":"cancel"
  },

  render: function() {
    var content = this.template();

    this.$el.html(content);
    return this;
  },

  submit: function() {
    var view = this;

    var title = $('#list-title').val();

    var list = new Tyrello.Models.List({
      //figure out a better way than setting both board and board id
      title: title,
      board_id: this.collection.board.get('id'),
      board: this.collection.board,
      rank: "0.0"
    });
    list.collection = this.collection

    list.save({rank: this.collection.length + 1},{
      success: function() {
        view.collection.add(list);
        //make this form dissapear...
        view.parent.newListToggle();
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