json.(
  list,
  :title,
  :rank,
  :id
)

if !card_lists.nil?
  card_lists.each do |cl_list, card_list|
    if cl_list == list
      json.cards(card_list) do |card|
        json.partial!("cards/card", :card => card, :todos => card.todo_items, :users => card.users)
      end
    end
  end
end