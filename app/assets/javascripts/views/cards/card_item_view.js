window.Trellino.Views.CardItemView = Backbone.View.extend({
  tagName: "li",

  className: "list-group-item card",

  attributes: function() {
    return {
      'data-rank': this.model.get('rank'),
      'data-list-id': this.model.list().id,
      'data-id': this.model.id
    }
  },

  template: JST["cards/show"],

  render: function() {
    var content = this.template({
      card: this.model
    });

    this.$el.html(content);

    return this;
  }
})