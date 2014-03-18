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
      email: email
    });
    member.collection = this.model.members();
    // need to figure out how to set association data
    this.model.save({newMemberEmail: email},{
      success: function() {
        member.collection.add(member);
        $('#member-email').val("");
        view.parent.addMemberToggle();
      }
    });
  },

  cancel: function() {
    this.parent.addMemberToggle();
  }
})
