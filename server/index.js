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
  const userId = 1;
  const { deckId, question, answer } = req.body;
  if (!deckId || !question || !answer) {
    throw new ClientError(400, 'Insufficient Card Information');
  }
  const sql = `
        insert into "cards" ("deckId", "question", "answer")
        select $1, $2, $3
        from "decks" as "d"
        where "d"."deckId" = $1
        and "d"."userId" = $4
        returning *
              `;
  const params = [deckId, question, answer, userId];
  db.query(sql, params)
    .then(result => {
      const [card] = result.rows;
      return res.status(201).json(card);
    })
    .catch(err => next(err));
});

app.get('/api/decks/:deckId', (req, res, next) => {
  const deckId = Number(req.params.deckId);
  if (!deckId) {
    throw new ClientError(400, 'deckId not provided');
  }

  const sql = `
        select "d".*,
            coalesce(json_agg("c" order by "c"."createdAt") filter (where "c"."cardId" is not NULL), '[]'::json) as "cards"
          from "decks" as "d"
          left join "cards" as "c" using ("deckId")
          where "d"."deckId" = $1
          group by "d"."deckId"
              `;
  const params = [deckId];
  db.query(sql, params)
    .then(result => {
      const [cards] = result.rows;
      return res.status(200).json(cards);
    })
    .catch(err => next(err));
});

app.put('/api/card/:cardId', (req, res, next) => {
  const cardId = Number(req.params.cardId);

  if (!cardId) {
    throw new ClientError(400, 'Insufficient Card Information');
  }

  if (!Number.isInteger(cardId) || cardId < 0) {
    throw new ClientError(400, 'gradeId must be a postive Integer');
  }

  const { question, answer } = req.body;

  const sql = `
                update "cards"
                set "question" = $1,
                    "answer" = $2
                  where "cardId" = $3
              returning *;
              `;

  const params = [question, answer, cardId];
  db.query(sql, params)
    .then(result => {
      const [updatedCards] = result.rows;
      if (!updatedCards) {
        throw new ClientError(404, 'cannot find card with specified cardId');
      } else {
        return res.json(updatedCards);
      }
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
