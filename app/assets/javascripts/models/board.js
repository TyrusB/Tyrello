window.Tyrello.Models.Board = Backbone.Model.extend({
  urlRoot: "/boards",

  lists: function() {
    if (!this._lists) {
      this._lists = new Tyrello.Collections.BoardLists([], {
        board: this
      });
    }

    return this._lists;
  },

  members: function() {
    if (!this._members) {
      this._members = new Tyrello.Collections.BoardMembers([], {
        board: this
      });
    }

    return this._members;
  },

  parse: function(jsonResp) {
    if (jsonResp.lists) {
      this.lists().set(jsonResp.lists, {parse: true});
      delete jsonResp.lists;

      this.members().set(jsonResp.members);
      delete jsonResp.members;
    }

    return jsonResp;
  }
})