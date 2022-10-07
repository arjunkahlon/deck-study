# Deck Study

A full-stack web application that allows users to create and study flash cards.

## Technologies Used

- React
- Node.js
- Express.js
- JavaScript
- HTML5
- CSS3
- Bootstrap 5
- React-Bootstrap Components
- Babel
- Webpack
- Argon 2
- JSON Web Token
- Dotenv


## Live Demo

Application is hosted on my personal domain: https://deck-study.arjunkahlon.com/

## Features

- User can sign up for Deck Study
- User can sign into Deck Study
- User can browse their course decks
- User can create a course deck
- User can delete a course deck
- User can browse cards in a deck
- User can add a new card to the deck
- User can edit a card in their deck
- User can delete a card in their deck
- User can study a deck and rate difficulty of each card
- User can sign out of Deck Study

## Stretch Features

- User can rearrange the order of cards in a deck
- User can toggle between decks while browsing through a deck
- User can swipe on deck to move forward or backwards
- User can view deck statistics (proficiency, card count, average-difficulty)

## Preview
#### User can create a deck
![create-deck](../deck-study/readme-gifs/create-deck.gif)

#### User can add a card
![add-card](../deck-study/readme-gifs/add-card.gif)

#### User can edit a card
![edit-card](../deck-study/readme-gifs/edit-card.gif)

#### User can study a deck and rate card difficulty
![study-deck](../deck-study/readme-gifs/study-deck.gif)

## Getting Started

1. Clone the repository
```
git clone https://github.com/arjunkahlon/deck-study.git
```
2. Install dependencies with Node Package Manager
```
npm install
```
3. Create local .env file from provided example template.
```
cp .env.example .env
```
4. Set the TOKEN_SECRET from changeme on your .env file
```
TOKEN_SECRET = 'replace changeme'
```
5. Start PostgreSQL
```
sudo service postgresql start
```
6. Create a database and update the name of your database in your .env file
```
createdb 'name of database'
```
7. Initialize database with schema.sql and import starting data from data.sql
```
npm run db:import
```
8. Start the project. Project can be viewed at http://localhost:3000 on your browser
```
npm run dev
```
9. Start pgweb to view our database
```
pgweb --db='name of database'
```
