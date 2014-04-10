class RootController < ApplicationController
  before_filter :require_login!

  def root
    @boards_json = Board.for_member(current_user).to_json.html_safe
  end
end
