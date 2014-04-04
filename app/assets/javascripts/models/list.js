window.Trellino.Models.List = Backbone.Model.extend({
  urlRoot: function() {
    if ( this.isNew() ) {
      return _.result(this.collection, 'url');
    } else {
      return "/lists";
    }
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
      this.cards().set(jsonResp.cards, {parse: true} );
      delete jsonResp.cards;
    }

    return jsonResp;
  }

})


// Reference of Backbone's built in url function
// url: function() {
//       var base =
//         _.result(this, 'urlRoot') ||
//         _.result(this.collection, 'url') ||
//         urlError();
//       if (this.isNew()) return base;
//       return base.replace(/([^\/])$/, '$1/') + encodeURIComponent(this.id);
//     },