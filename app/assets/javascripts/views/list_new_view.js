window.Trellino.Views.ListNewView = Backbone.View.extend({
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
    
    var list = new Trellino.Models.List({
      title: title,
      board: this.collection.board
    });
    // need to figure out how to set association data
    list.save({
      success: function() {
        view.collection.add(list);
        //make this form dissapear...
        view.parent.newListToggle();
      }
    });
  },

  cancel: function() {
    // try to avoid if possible
    // call event on collection
    this.parent.newListToggle();
  }
})