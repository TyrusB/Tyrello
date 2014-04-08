# Tyrello

A visual task-manager application. Users Create boards, boards contain lists, lists contain cards, cards contain todos. Fun with nested associations! Includes a drag and drop UI similar to the website Trello, where Users can change the order of cards, move cards from list to list, and even change the order of the lists.

## Instructions

Using Tyrello is simple! Sign in, then create a board or click on a link to an existing ones. All new lists and cards can be created with the click of a button. Todo lists belonging to cards appear when you click on them.

## Technical Features

* Nested associations many levels deep in data model.
* Shallow routing to avoid nesting routes more than one level deep.
* Drag and drop UI for both cards and lists.
* Ranking algorithm using HTML5 data attribute to persist changes in card/list order.
* Backbone on the frontend.
* Uses jbuilder to customize API.
* Overrides Backbone Models' parse methods to make use of associational data.
* Custom Composite View superclass for Backbone board view.
* Modals for individual card display.
