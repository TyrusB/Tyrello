window.Trellino.Views.BoardShowView = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  events: {
    "click button#new-list-button":"newListToggle",
    "click button#add-member-button":"addMemberToggle"
  },

  initialize: function() {
    // this.subSelector = '#lists-container'

    this.listenTo(this.model, 'sync', this.render)
    this.listenTo(this.model.lists(), 'add', this.addList)
    this.listenTo(this.model.members(), 'add', this.addMember)

    //QUESTION: why does this work? Is this even rendered yet?
    // or is only for going back and then coming back to a page
    this.model.lists().each(this.addList.bind(this));
    this.model.members().each(this.addMember.bind(this));

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

    return this;
  },

  addList: function(list) {
    //don't forget to add!
    var listItemView = new Trellino.Views.ListItemView({
      model: list
    })

    this.addSubview('#lists-container', listItemView);
    listItemView.render();
  },

  addMember: function(member) {
    var memberView = new Trellino.Views.MemberItemView({
      model: member
    })

    this.addSubview('#members-container', memberView);
    memberView.render();

  },

  newListToggle: function() {
    $container = $('#new-list-container')

    if ($container.children().length == 0) {
      var newListForm = new Trellino.Views.ListNewView({
        //still needs work figuring out what info to pass to make saving work
        parent: this,
        collection: this.model.lists()
      });

      $container.html(newListForm.render().$el);

      $("#new-list-button").toggle();

    } else {
      $('#new-list-container').toggle();
      $('#new-list-button').toggle();
    }
  },
  
  addMemberToggle: function() {
    $container = $('#add-member-container')

    if ($container.children().length == 0) {
      var addMemberForm = new Trellino.Views.MemberAddView({
        //still needs work figuring out what info to pass to make saving work
        parent: this,
        collection: this.model.members()
      });

      $container.html(addMemberForm.render().$el);

      $("#add-member-button").toggle();

    } else {
      $('#add-member-container').toggle();
      $('#add-member-button').toggle();
    }
  }
})