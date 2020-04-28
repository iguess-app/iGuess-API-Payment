CREATE SCHEMA products
    AUTHORIZATION api;

--======================================

CREATE TABLE products.info
(
    "productId" serial NOT NULL,
    "productName" character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT info_pkey PRIMARY KEY ("productId")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE products.info
    OWNER to api;    

--======================================

CREATE TABLE products.prices
(
    "productId" serial NOT NULL,
    "currency" character varying(3) COLLATE pg_catalog."default" NOT NULL,
    "price" numeric,
    "discountPrice" numeric,
    CONSTRAINT "OnlyOneProductForEachCurrency" PRIMARY KEY ("productId", "currency"),
    CONSTRAINT "ProductId FK From products.info" FOREIGN KEY ("productId")
        REFERENCES products.info ("productId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT prices_discount_price_check CHECK ("discountPrice" > 0::numeric),
    CONSTRAINT prices_price_check CHECK ("price" > 0::numeric),
    CONSTRAINT "priceGreaterThanDiscountPrice" CHECK ("discountPrice" < "price")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE products.prices
    OWNER to api;
COMMENT ON CONSTRAINT "OnlyOneProductForEachCurrency" ON products.prices
    IS 'It is not possible create two values of the same currency to a product';

COMMENT ON CONSTRAINT "priceGreaterThanDiscountPrice" ON products.prices
    IS 'The DiscountPrice must be less than price';    
