window.Trellino.Views.BoardShowView = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  initialize: function() {
    this.subSelector = '#lists-container'

    this.listenTo(this.model, 'sync', this.render)
    this.listenTo(this.model.lists(), 'add', this.addList)

    this.model.lists().each(this.addList.bind(this));

    //still need to add a new list form
  },

  render: function() {
    var content = this.template({
      board: this.model,
      lists: this.model.lists()
    })

    this.$el.html(content);
    //render subviews?
    //yep, render subviews
    this.renderSubviews();

    return this;
  },

  addList: function(list) {
    //don't forget to add!
    var listShowView = new Trellino.Views.ListShowView({
      model: list
    })

    this.addSubview(listShowView);
    listShowView.render();
  }


})