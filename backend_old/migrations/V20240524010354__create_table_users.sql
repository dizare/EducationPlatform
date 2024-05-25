CREATE TABLE IF NOT EXISTS app."users"
(
    "id" bigserial primary key NOT NULL,
    "firstname" text NOT NULL,
    "lastname" text NOT NULL,
    "email" text NOT NULL UNIQUE,
    "password" text NOT NULL
)