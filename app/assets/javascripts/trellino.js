window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function (data) {
    var boards = new Trellino.Collections.Boards(data);


    new Trellino.Routers.AppRouter({
      bootstrapped: boards,
      $rootEl: $('#content')
     });

     Backbone.history.start();

  }

}


Backbone.Collection.prototype.getOrFetch = function(id) {

  var model;
  var boards = this;

  if (model = this.get(id)) {
    model.fetch();
    return model;
  } else {
    model = new Trellino.Models.Board({id: id})
    model.fetch({
      success: function() { boards.add(model) }
    })
    return model;
  }


}

Backbone.View.prototype.leave = function() {
  this.remove();
}

Backbone.CompositeView = Backbone.View.extend({

  // so, render the template before calling this.
  // need to define a $subEl as well.
  addSubview: function(subview) {
    this.subviews().push(subview)

    // have to actually add to the dom
    this.$subEl.append(subview.$el)
  },

  removeSubview: function(subview) {
    this.subviews() = _.without(this.subviews(), subview);

    subview.leave();
  },

  leave: function() {
    Backbone.View.prototype.remove.call(this);

    _(this.subviews()).each(function(subview) {
      subview.leave();
    });
  },

  renderSubviews: function() {
    _(this.subviews()).each(function() {
      this.$subEl.append(subview.$el);
    })
  },

  subviews: function() {
    if (!this._subviews) {
      this._subviews = [];
    }

    return this._subviews;
  }
});


// boards.add(data, {
//  success: function() {
//    new Trellino.Routers.AppRouter({
//      bootstrapped: boards,
//      $rootEl: $('#content')
//     });
//
//     Backbone.history.start();
//   }
// });
