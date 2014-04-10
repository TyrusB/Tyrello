class BoardsController < ApplicationController
  before_filter :require_login!

  def index
    @boards = Board.for_member(current_user)

    render "boards/index"
  end

  def show
    @board = Board.find(params[:id])

    @lists = List.where(:board_id => @board).includes(:cards)

    @card_lists = {}
    @lists.each{ |list| @card_lists[list] = list.cards }

    @members = @board.members


    render "boards/show"
  end

  def create
    @board = current_user.boards.build(board_params)

    if @board.save
      render "boards/show"
    else
      render json: { errors: @board.errors.full_messages }, status: 422
    end
  end

  def update
    @board = Board.find(params[:id])
    @board.update_attributes(board_params)
    @lists = @board.lists

    if params[:newMemberEmail]
      email = params[:newMemberEmail]
      new_member = User.find_by_email(email)
      new_member && !@board.members.include?(new_member) && @board.members << new_member
    end

    if @board.save
      render "boards/show"
    else
      render json: { errors: @board.errors.full_messages }, status: 422
    end
  end

  def destroy
    @board = Board.find(params[:id])
    @board.destroy
    render json: nil
  end


  private
  def board_params
    params.require(:board).permit(:title, :description, :newMemberEmail)
  end
end
