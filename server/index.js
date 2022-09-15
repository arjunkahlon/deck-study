require('dotenv/config');
const pg = require('pg');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

const jsonMiddleWare = express.json();
app.use(jsonMiddleWare);

app.use(staticMiddleware);

app.post('/api/deck', (req, res, next) => {
  const userId = 1;
  const { newDeckName } = req.body;
  if (!newDeckName) {
    throw new ClientError(400, 'deck name is required');
  }

  const sql = `
        insert into "decks" ("deckName", "userId", "deckStudyCount")
        values ($1, $2, $3)
        returning *
                `;
  const params = [newDeckName, userId, 0];
  db.query(sql, params)
    .then(result => {
      const [deck] = result.rows;
      res.status(201).json(deck);
    })
    .catch(err => next(err));
});

app.get('/api/decks', (req, res, next) => {
  const userId = 1;
  const sql = `
          select * from "decks"
          where "userId" = $1
          `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const decks = result.rows;
      return res.status(200).json(decks);
    })
    .catch(err => next(err));
});

app.post('/api/card', (req, res, next) => {
  const { deckId, question, answer } = req.body;
  if (!deckId || !question || !answer) {
    throw new ClientError(400, 'Insufficient Card Information');
  }
  const sql = `
        insert into "cards" ("deckId", "question", "answer")
        values ($1, $2, $3)
        returning *
              `;
  const params = [deckId, question, answer];
  db.query(sql, params)
    .then(result => {
      const [card] = result.rows;
      return res.status(201).json(card);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
