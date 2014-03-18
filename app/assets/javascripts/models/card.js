window.Trellino.Models.Card = Backbone.Model.extend({
  // urlRoot: function() {
  //   return "/lists/" + this.list().id + "/cards";
  // },

  initialize: function(options) {
    // this.list = options.list
  },

  list: function () {
    return this.collection.list;
  }
});