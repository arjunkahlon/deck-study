set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

 CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"joinedAt" timestamptz NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."decks" (
	"deckId" serial NOT NULL,
	"deckName" TEXT NOT NULL,
	"userId" int NOT NULL,
	"createdAt" timestamptz NOT NULL default now(),
	"deckStudyCount" int NOT NULL,
	CONSTRAINT "decks_pk" PRIMARY KEY ("deckId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."cards" (
	"cardId" serial NOT NULL,
	"deckId" int NOT NULL,
	"question" TEXT NOT NULL,
	"answer" TEXT NOT NULL,
	"difficulty" int DEFAULT NULL,
	"createdAt" timestamptz NOT NULL default now(),
	CONSTRAINT "cards_pk" PRIMARY KEY ("cardId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "decks" ADD CONSTRAINT "decks_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "cards" ADD CONSTRAINT "cards_fk0" FOREIGN KEY ("deckId") REFERENCES "decks"("deckId");
