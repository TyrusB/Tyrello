window.Trellino.Views.BoardShowView = Backbone.View.extend({
  template: JST['boards/show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render)
  },

  render: function() {
    var content = this.template({
      board: this.model,
      lists: this.model.lists()
    })

    this.$el.html(content);
    return this;
  }


})