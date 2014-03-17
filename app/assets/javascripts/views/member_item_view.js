window.Trellino.Views.MemberItemView = Backbone.View.extend({
  tagName: "li",

  template: JST["members/show"],

  render: function() {
    var content = this.template({
      member: this.model
    });

    this.$el.html(content);

    return this;
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  }
})