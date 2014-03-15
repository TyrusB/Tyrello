window.Trellino.Models.List = Backbone.Model.extend({
  // Need to set a url based on board?
  // how to store that?
  //urlRoot: this.board.url() + "/lists",

  initialize: function(options) {
    this.board = options.board
  },

  cards: function() {
    if (!this._cards) {
      this._cards = new Trellino.Collections.ListCards([], {
        list: this
      });
    }

    return this._cards;
  },

  parse: function(jsonResp) {
    if (jsonResp.cards) {
      this.cards().set(jsonResp.cards);
      delete jsonResp.cards;
    }

    return jsonResp;
  }

})