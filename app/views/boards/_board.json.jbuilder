json.(board, :id, :title)

lists ||= nil
cards ||= nil

if !lists.nil?
  json.lists(lists) do |list|
    json.partial!("lists/list", :list => list, :cards => cards)
  end
end