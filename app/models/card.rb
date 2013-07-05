class Card < ActiveRecord::Base
  attr_accessible :title, :description, :rank, :list_id
  
  validates :title, :rank, :list_id, presence: true
  
  belongs_to :list
  has_one :board, through: :list
  has_many :todo_items, inverse_of: :card
end
