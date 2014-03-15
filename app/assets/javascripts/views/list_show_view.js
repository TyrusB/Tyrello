window.Trellino.Views.ListShowView = Backbone.CompositeView.extend({
  template: JST["lists/show"],

  render: function() {
    var content = this.template({
      list: this.model
    })

    this.$el.html(content);

    return this;
  },

  initialize: function() {
    this.subSelector = '#cards-container' + this.model.get('id')

    // this.listenTo(this.model, 'sync', this.render)
//     this.listenTo(this.model.cards(), 'add', this.addCard)
//
//     this.model.cards().each(this.addCard.bind(this));
  }


  // Make an addCard function

})