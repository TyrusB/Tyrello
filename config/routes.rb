Trellino::Application.routes.draw do
  root to: "root#root"
  
  resources :users, except: :index 
  resources :boards, shallow: true do 
    resources :users, only: :index
    resources :lists do
      resources :cards do
        resources :todo_items
      end
    end
  end

  resources :card_assignments, only: :destroy
  resource :session, only: [:new, :create, :destroy]
end



#   resources :boards, only: [:index, :show, :create, :update, :destroy] do
#     resources :lists, only: [:index, :show, :create, :update, :destroy]
#   end

#   resources :lists, only: [] do
#     resources :cards, only: [:index]
#   end

#   resources :cards, only: [:show, :create, :update, :destroy] do
#     resources :todo_items, shallow: true
#   end

#   resources :card_assignments, only: :destroy
#   resource :session, only: [:new, :create, :destroy]
#   resources :users, only: [:new, :create, :destroy]
#   root to: 'root#root'
# end
