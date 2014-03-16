window.Trellino.Views.ListNewView = Backbone.View.extend({
  template: JST["lists/new"],

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
    var title = $('#list-title').val();
    var list = new Trellino.Models.List({
      title: title
    });
    list.save({
      success: function() {
        this.collection.add(list);
        //make this form dissapear...
      }
    });
  },

  cancel: function() {
    // not sure what to do here.
  }
})