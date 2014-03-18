window.Trellino.Views.ListItemView = Backbone.CompositeView.extend({
  template: JST["lists/show"],

  className: "myList",

  tagName: "div",

  events: {
    // need to make this id-specific
    "click button.new-card-button":"newCardToggle",
    "sortstop":"updateOrder"
  },

  initialize: function() {
    // this.subSelector = '#cards-container-' + this.model.get('id')
    // STill need to make a remove card function
    this.listenTo(this.model, 'sync', this.render)
    this.listenTo(this.model.cards(), 'add', this.addCard)

    this.model.cards().each(this.addCard.bind(this));

  },

  render: function() {
    var listId = 'cards-container-' + this.model.id;

    var content = this.template({
      listId: listId,
      list: this.model
    })

    this.$el.html(content);
    //Make the list items sortable
    this.$el.find('#' + listId).sortable({
      connectWith: '.sortable-cards',
      placeholder: 'placeholder-style'
    })

    this.renderSubviews();

    return this;
  },

  addCard: function(card) {
    var cardView = new Trellino.Views.CardItemView({
      model: card
    })

    this.addSubview('#cards-container-' + this.model.get('id'), cardView);
    cardView.render();
  },

  newCardToggle: function() {
    $container = this.$('#new-card-container-' + this.model.id)

    if ($container.children().length == 0) {
      var newCardForm = new Trellino.Views.CardNewView({
        //still needs work figuring out what info to pass to make saving work
        parent: this,
        collection: this.model.cards()
      });

      $container.html(newCardForm.render().$el);

      this.$(".new-card-button").toggle();

    } else {
      this.$('#new-card-container-' + this.model.id ).toggle();
      this.$(".new-card-button").toggle();
    }
  },

  updateOrder: function(event, ui) {
    // this is being called in the list receiving the item.
    var $card = $(ui.item);
    var cardId = $card.data('id');

    var prevRank = $card.prev('li').data('rank');
    var nextRank = $card.next().data('rank');

    var newListId = $card.parent().data('list-id');


    var newRank = this._calculateRank(nextRank, prevRank);

    var card = this.model.cards().get(cardId)

    var oldList = this.model;

    card.save({
      rank: newRank,
      list_id: newListId
    }, {
      patch: true,
      success: function() {
        $card.data('rank', newRank);
        $card.data('list-id', newListId);

        oldList.cards().remove(card);
        var newList = oldList.collection.get(newListId);
        newList.cards().add(card, {silent: true});
      }
    })
  },

  _calculateRank: function(next, prev) {
    if (!next) {
      if (!prev) {
        return 1
      } else {
        return (prev + 1);
      }
    } else if (!prev) {
      return (next / 2);
    }

    return (next + prev) / 2
  }

})