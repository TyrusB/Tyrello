window.Trellino.Views.ListItemView = Backbone.CompositeView.extend({
  template: JST["lists/show"],

  tagName: "li",

  render: function() {
    var content = this.template({
      list: this.model
    })

    this.$el.html(content);

    this.renderSubviews();

    return this;
  },

  initialize: function() {
    this.subSelector = '#cards-container-' + this.model.get('id')
    // STill need to make a remove card function
    this.listenTo(this.model, 'sync', this.render)
    this.listenTo(this.model.cards(), 'add', this.addCard)

    this.model.cards().each(this.addCard.bind(this));
  },

  addCard: function(card) {
    var cardView = new Trellino.Views.CardItemView({
      model: card
    })

    this.addSubview(cardView);
    cardView.render();
  }


  // Make an addCard function

})