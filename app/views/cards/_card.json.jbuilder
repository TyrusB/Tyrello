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
  json.todos(todos) do |todo|
    json.partial!("todos/todo", :todo => todo)
  end
end

unless users.nil?
  json.users(users) do |user|
    json.partial!("users/member", :member => user)
  end
end