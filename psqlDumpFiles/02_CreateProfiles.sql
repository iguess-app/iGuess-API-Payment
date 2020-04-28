CREATE SCHEMA profiles
    AUTHORIZATION api;

--======================================

CREATE TABLE profiles.users
(
    "userRef" character varying(24) COLLATE pg_catalog."default" NOT NULL,
    "cpf" numeric(11,0) NOT NULL,
    "fullName" character varying(200) COLLATE pg_catalog."default" NOT NULL,
    "birthDate" date NOT NULL,
    "email" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "moipCustomerId" character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY ("userRef"),
    CONSTRAINT "UniqueMoipCustomerid" UNIQUE ("moipCustomerId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE profiles.users
    OWNER to api;