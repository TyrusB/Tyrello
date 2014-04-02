class RootController < ApplicationController
  before_filter :require_login!

  def root
    @boards_json = Board.all.to_json.html_safe
  end
end
