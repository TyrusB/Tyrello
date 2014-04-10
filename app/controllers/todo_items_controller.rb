class TodoItemsController < ApplicationController
  # Two fixes to strong params root problem: wrap_parameters here, or override toJSON in the BB model
  # Rails automatically wraps params if they're the same name as the controller's model
  wrap_parameters :todo_item

  def create
    @card = Card.find(params[:card_id])
    @item = @card.todo_items.build(todo_item_params)

    if @item.save
      render json: @item
    else
      render json: { errors: @item.errors.full_messages }, status: 422
    end
  end

  def update
    @item = TodoItem.find(params[:id])
    @item.update_attributes(todo_item_params)

    if @item.save
      render json: @item
    else
      render json: { errors: @item.errors.full_messages }, status: 422
    end
  end

  def destroy
    @item = TodoItem.find(params[:id])
    @item.destroy
    render json: nil
  end


  private

  def todo_item_params
    params.require(:todo).permit(:title, :done)
  end
end
