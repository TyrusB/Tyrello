window.Tyrello.Views.BoardShowView = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  events: {
    "click button#new-list-button":"newListToggle",
    "click button#add-member-button":"addMemberToggle",
    "click li.card":"loadModal",
    "sortstop":"updateOrder"
  },

  initialize: function() {

    this.listenTo(this.model, 'sync', this.render)
    this.listenTo(this.model.lists(), 'add', this.addList)
    this.listenTo(this.model.members(), 'add', this.addMember)

    //Note: in normal operations, the functions below are unnecessary (the collections start off empty)
    // But it allows for navigating back and forward, from the page, away, and then back again.
    this.addAll(this.model.lists(), this.addList.bind(this) )
    this.addAll(this.model.members(), this.addMember.bind(this) )

  },

  render: function() {
    var content = this.template({
      board: this.model
    })

    this.$el.html(content);
    //add your sortable elements
    this.$el.find('#lists-container').sortable();

    this.renderSubviews();

    return this;
  },

  loadModal: function(event) {
    var $card = $(event.currentTarget);
    var cardId = $card.data('id'),
        listId = $card.data('list-id');

    var card = this.model.lists().get(listId).cards().get(cardId);

    var modalView = new Tyrello.Views.CardModalView({
      model: card
    })

    this.$('#modal-container').html(modalView.render().$el);
    this.$('#card-modal').modal('show');

  },

  addAll: function(collection, addFunction) {
    collection.each(addFunction);
  },

  addList: function(list) {
    var listItemView = new Tyrello.Views.ListItemView({
      model: list
    })

    this.addSubview('#lists-container', listItemView);
    
    listItemView.render();
  },

  addMember: function(member) {
    var memberView = new Tyrello.Views.MemberItemView({
      model: member
    })

    this.addSubview('#members-container', memberView);

    memberView.render();

  },

  newListToggle: function() {
    $container = $('#new-list-container')

    if ($container.children().length == 0) {
      var newListForm = new Tyrello.Views.ListNewView({
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
      var addMemberForm = new Tyrello.Views.MemberAddView({
        //still needs work figuring out what info to pass to make saving work
        parent: this,
        model: this.model
      });

      $container.html(addMemberForm.render().$el);

      $("#add-member-button").toggle();

    } else {
      $('#add-member-container').toggle();
      $('#add-member-button').toggle();
    }
  },

  updateOrder: function(event, ui) {
    if ($(ui.item).hasClass("list") ){
      var $list = $(ui.item);
      var listId = $list.data('id');

      var prevRank = $list.prev().data('rank');
      var nextRank = $list.next().data('rank');

      var newRank = this._calculateRank(nextRank, prevRank);

      var list = this.model.lists().get(listId)

      list.save({ "rank": newRank }, {
        patch: true,
        success: function(model) {
          $list.data('rank', newRank);
        }
      })
    }
  },

  _calculateRank: function(next, prev) {
    if (!next) {
      if (!prev) {
        return 1
      } else {
        return (prev + 1);
      }
    } else if (!prev) {
      return (next / 2);
    }

    return (next + prev) / 2
  }

})

//TODO:
//1. replace current toggle format with one that replaces the html with a rendered form view.
// 2. Instead of passing parent view, have both success and failure trigger an add event on the collection. Have the board show view rerender on add.