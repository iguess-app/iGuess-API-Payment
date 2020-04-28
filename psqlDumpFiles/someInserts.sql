insert into profiles.users("userRef","cpf","fullName","birthDate","email","moipCustomerId") values ('591df6c78d1fdc0bb4eba371','40225626845','LUCAS H A SILVA','1993-11-24','lucashalves@live.com','CUS-87HFA3QCEKO7');

insert into products.info("productName") values ('guessLine');
insert into products.info("productName") values ('guessLeague');

INSERT INTO products.prices values (1, 'BRL', 4.5);
INSERT INTO products.prices values (2, 'BRL', 2.5);

insert into payments.cardBrands("brandName") values ('mastercard');
insert into payments.cardBrands("brandName") values ('visa');
insert into payments.cardBrands("brandName") values ('amex');

insert into payments.creditcard values ('591df6c78d1fdc0bb4eba371', 'XXXXXX hash card XXXXXXXXX', null, 1, '2019-07-01', 'CARTAO_ID_TESTE');

insert into payments.orders values ('591df6c78d1fdc0bb4eba371', 'CARTAO_ID_TESTE', 'ORDER_ID_TEST', 1, '2019-07-01');