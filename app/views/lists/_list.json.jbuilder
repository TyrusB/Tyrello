json.(
  list,
  :title,
  :rank,
  :id
)

if !cards.nil?
  json.cards(cards) do |card|
    json.partial!("cards/card", :card => card)
  end
end