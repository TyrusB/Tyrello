window.Trellino.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl
    //Bootstrapped data comes with both cards and lists
    this.boards = options.bootstrapped;
    console.log(this.boards)
  },

  routes: {
    "":"boardIndex",
    "boards/:id":"boardShow"
  },

  boardIndex: function() {
    var indexView = new Trellino.Views.BoardIndexView({
      collection: this.boards
    })

    this.boards.fetch();

    this._swapView(indexView)
  },

  boardShow: function(id) {
    var board = this.boards.getOrFetch(id);

    var showView = new Trellino.Views.BoardShowView({
      model: board
    })

    this._swapView(showView)
  },


  _swapView: function(newView) {
    this.currentView && this.currentView.remove();

    this.currentView = newView;

    this.$rootEl.html(newView.render().$el)
  }

})