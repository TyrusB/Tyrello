window.Trellino.Views.MemberAddView = Backbone.View.extend({
  template: JST['members/add'],

  initialize: function(options) {
    this.parent = options.parent
  },

  events: {
    "click button#add-member-submit":"submit",
    "click button#add-member-cancel":"cancel"
  },

  render: function() {
    var content = this.template();

    this.$el.html(content);
    return this;
  },

  submit: function() {
    var view = this;

    var email = $('#member-email').val();
    
    var member = new Trellino.Models.Member({
      email: email,
      //board: this.collection.board
    });
    // need to figure out how to set association data
    member.save({
      success: function() {
        //view.collection.add(list);
        //make this form dissapear...
        view.parent.addMemberToggle();
      }
    });
  },

  cancel: function() {
    this.parent.addMemberToggle();
  }
})
