# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

guest = User.create!(email: 'guest@ty-brooks.com', password: 'password')
ty = User.create!(email: 'ty@ty-brooks.com', password: 'pass')

# Sample board 1
sample_board = guest.boards.build(
  title: "Example Board"
)

sample_board.lists.build(
  [
    {rank: 1, title: "To Do", }, #1
    {rank: 2, title: "Doing"}, #2
    {rank: 3, title: "Done"} #3
  ]
)

sample_board.lists[0].cards.build([
  {rank: 1, title: "Clean dishes"},
  {rank: 2, title: "Mop kitchen"}
])
sample_board.lists[1].cards.build([
  {rank: 1, title: "Fix back door"}
])
sample_board.lists[2].cards.build([
  {rank: 1, title: "Water plants"},
  {rank: 2, title: "Fold sheets"}
])

sample_board.save