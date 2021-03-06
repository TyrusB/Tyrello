json.(board, :id, :title)

lists ||= nil
cards ||= nil

members ||= nil

if !lists.nil?
  json.lists(lists) do |list|
    json.partial!("lists/list", :list => list, :card_lists => card_lists)
  end
end

if !members.nil?
  json.members(members) do |member|
    json.partial!("users/member", :member => member)
  end
end