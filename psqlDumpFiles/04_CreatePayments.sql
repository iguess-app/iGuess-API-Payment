CREATE SCHEMA payments
    AUTHORIZATION api;

--======================================

CREATE TABLE payments.cardbrands
(
    "brandId" serial NOT NULL,
    "brandName" character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT cardbrands_pkey PRIMARY KEY ("brandId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE payments.cardbrands
    OWNER to api;

--======================================

CREATE TABLE payments.creditcard
(
    "userRef" character varying(24) COLLATE pg_catalog."default" NOT NULL,
    "cardNumberCiphered" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "moipHashCardId" character varying(200) COLLATE pg_catalog."default",
    "brandId" serial NOT NULL,
    "dueDate" date NOT NULL,
    "last4" integer NOT NULL,
    CONSTRAINT "cardNumber_pk" PRIMARY KEY ("cardNumberCiphered"),
    CONSTRAINT brand_fk FOREIGN KEY ("brandId")
        REFERENCES payments.cardbrands ("brandId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "userRef_FK" FOREIGN KEY ("userRef")
        REFERENCES profiles.users ("userRef") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE payments.creditcard
    OWNER to api;
COMMENT ON CONSTRAINT "cardNumber_pk" ON payments.creditcard
    IS 'The cardNumberCiphered is a result to a numberCard with a userKey';

--======================================

CREATE TABLE payments.orders
(
    "userRef" character varying(24) COLLATE pg_catalog."default" NOT NULL,
    "cardNumberCiphered" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "orderId" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "productId" integer NOT NULL,
    "orderDate" timestamp(4) with time zone NOT NULL,
    "coordinates" json,
    "moipOrderId" character varying(200) COLLATE pg_catalog."default",
    CONSTRAINT orders_pkey PRIMARY KEY ("orderId"),
    CONSTRAINT "cardNumber_FK" FOREIGN KEY ("cardNumberCiphered")
        REFERENCES payments.creditcard ("cardNumberCiphered") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "productId_FK" FOREIGN KEY ("productId")
        REFERENCES products.info ("productId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "userRef_FK" FOREIGN KEY ("userRef")
        REFERENCES profiles.users ("userRef") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE payments.orders
    OWNER to api;                