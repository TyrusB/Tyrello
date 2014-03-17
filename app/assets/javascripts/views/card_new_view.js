window.Trellino.Views.CardNewView = Backbone.View.extend({
  template: JST["cards/new"],

  initialize: function(options) {
    this.parent = options.parent
  },

  events: {
    "click button#new-card-submit":"submit",
    "click button#new-card-cancel":"cancel"
  },

  render: function() {
    var content = this.template();

    this.$el.html(content);
    return this;
  },

  submit: function() {
    var view = this;

    var title = $('#card-title').val();
    
    var card = new Trellino.Models.Card({
      title: title,
      list: this.collection.list
    });
    // need to figure out how to set association data
    card.save({
      success: function() {
        view.collection.add(card);
        //make this form dissapear...
        view.parent.newCardToggle();
      }
    });
  },

  cancel: function() {
    this.parent.newCardToggle();
  }})