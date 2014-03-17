window.Trellino.Views.ListItemView = Backbone.CompositeView.extend({
  template: JST["lists/show"],

  tagName: "li",

  events: {
    // need to make this id-specific
    "click button":"newCardToggle",
  },

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

    this.addSubview('#cards-container-' + this.model.get('id'), cardView);
    cardView.render();
  },

  newCardToggle: function() {
    $container = $('#new-card-container-' + this.model.get('id'))

    if ($container.children().length == 0) {
      var newCardForm = new Trellino.Views.CardNewView({
        //still needs work figuring out what info to pass to make saving work
        parent: this,
        collection: this.model.cards()
      });

      $container.html(newCardForm.render().$el);

      $("#new-card-button-" + this.model.get('id')).toggle();

    } else {
      $('#new-card-container-' + this.model.get('id')).toggle();
      $('#new-card-button-' + this.model.get('id')).toggle();
    }
  },

})