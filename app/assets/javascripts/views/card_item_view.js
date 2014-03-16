window.Trellino.Views.CardItemView = Backbone.View.extend({
  tagName: "li",

  template: JST["cards/show"],

  render: function() {
    var content = this.template({
      card: this.model
    });

    this.$el.html(content);

    return this;
  }
})