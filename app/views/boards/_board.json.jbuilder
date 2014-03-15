json.(board, :id, :title)

lists ||= nil

if !lists.nil?
  json.lists(lists) do |list|
    json.partial!("lists/list", :list => list)
  end
end