Tyrello::Application.routes.draw do
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

