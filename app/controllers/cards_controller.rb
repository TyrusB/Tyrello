class CardsController < ApplicationController

  def index
    @cards = Card.where("list.id = ?", params[:list_id])

    render json: @cards
  end

  def create
    @list = List.find(params[:list_id])
    @card = @list.cards.build(card_params)

    if @card.save
      render json: @card
    else
      render json: { errors: @card.errors.full_messages }, status: 422
    end
  end

  def update
    @card = Card.find(params[:id])
    @card.update_attributes(card_params)

    #add users to cards here
    if params[:newUserEmail]
      email = params[:newUserEmail]
      new_user = User.find_by_email(email)
      new_user && !@card.users.include?(new_user) && @card.users << new_user
    end

    if @card.save
      render json: @card
    else
      render json: { errors: @card.errors.full_messages }, status: 422
    end
  end

  def destroy
    @card = Card.find(params[:id])
    @card.destroy
    render json: @card
  end

  def show
    @card = Card.find(params[:id])

    @todos = @card.todo_items
    @users = @card.users

    render "cards/member"
  end

  private
  def card_params
    params.require(:card).permit(:title, :description, :rank, :list_id)
  end
end
