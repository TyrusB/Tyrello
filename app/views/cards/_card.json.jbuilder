json.(
  card,
  :title,
  :description,
  :rank,
  :id
)

todos ||= nil
users ||= nil

unless todos.nil?
  json.todo_items(todos) do |todo|
    json.partial!("todos/todo", :todo => todo)
  end
end

unless users.nil?
  json.users(users) do |user|
    json.partial!("users/member", :member => user)
  end
end