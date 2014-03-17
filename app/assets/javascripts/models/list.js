window.Trellino.Models.List = Backbone.Model.extend({
  // Need to set a url based on board?
  // how to store that?
  initialize: function(options) {
    this.board = options.board
  },

  urlRoot: function() { 
    return this.board.url() + "/lists"
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