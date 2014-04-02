window.Trellino.Views.CardNewView = Backbone.View.extend({
  template: JST["cards/new"],

  tagName: 'form',

  initialize: function(options) {
    this.parent = options.parent
  },

  events: {
    "click button.card-submit":"submit",
    "click button.card-cancel":"cancel"
  },

  render: function() {
    var content = this.template({
      list: this.collection.list
    });

    this.$el.html(content);
    return this;
  },

  submit: function() {
    var view = this;

    var title = $('#card-title-' + this.collection.list.get('id')).val();

    var card = new Trellino.Models.Card({
      title: title,
      list_id: this.collection.list.id
    });
    card.collection = this.collection
    // need to figure out how to set association data
    card.save({rank: this.collection.length + 1},{
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

