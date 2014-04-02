window.Trellino.Views.CardModalView = Backbone.View.extend({
  template: JST["cards/modal"],

  render: function() {
    var content = this.template({
      card: this.model
    });

    this.$el.html(content);

    return this;
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render)
  }
})