window.Trellino.Views.BoardShowView = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  initialize: function() {
    this.subSelector = '#lists-container'

    this.listenTo(this.model, 'sync', this.render)
    this.listenTo(this.model.lists(), 'add', this.addList)
    this.listenTo(this.model.members(), 'add', this.renderMembers)

    //QUESTION: why does this work? Is this even rendered yet?
    // or is only for going back and then coming back to a page
    this.model.lists().each(this.addList.bind(this));

    //still need to add a new list form
  },

  render: function() {
    var content = this.template({
      board: this.model
    })

    this.$el.html(content);
    //render subviews?
    //yep, render subviews
    this.renderSubviews();
    this.renderMembers();

    return this;
  },

  addList: function(list) {
    //don't forget to add!
    var listShowView = new Trellino.Views.ListItemView({
      model: list
    })

    this.addSubview(listShowView);
    listShowView.render();
  },

  renderMembers: function() {
    var $container = this.$('#members-container');
    $container.empty();

    this.model.members().each(function(member) {
      var $member = $('<li></li>');
      $container.append($member.html(member.get('email')));
    });

  } 

})