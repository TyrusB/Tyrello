class ListsController < ApplicationController

  def index
    @lists = List.where("board_id = ?", params[:board_id])

    render json: @lists
  end

  def create
    @board = Board.find(params[:board_id])
    @list = @board.lists.build(list_params)

    if @list.save
      render json: @list
    else
      render json: { errors: @list.errors.full_messages }, status: 422
    end
  end

  def show
    @list = List.find(params[:id])
    render json: @list
  end

  def update
    @list = List.find(params[:id])
    @list.update_attributes(list_params)

    if @list.save
      render json: @list
    else
      render json: { errors: @list.errors.full_messages }, status: 422
    end
  end

  def destroy
    @list = List.find(params[:id])
    @list.destroy
    render json: nil
  end

  private
  def list_params
    params.require(:list).permit(:title, :rank)
  end
end
