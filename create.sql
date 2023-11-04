drop schema mba cascade;

create schema mba;

create table mba.contract (
    id_contract uuid not null default uuid_generate_v4() primary key,
    description text,
    amount numeric,
    periods integer,
    date timestamp
);

create table mba.payment(
  id_payment uuid not null default uuid_generate_v4() primary key,
  id_contract uuid references mba.contract(id_contract),
  amount numeric,
  date timestamp
);

insert into mba.contract values ('e6c5df67-3462-549b-84a9-3df7a9fdbfa9','Prestação de Serviços Escolares', 6000, 12, '2022-01-01T10:00:00');
insert into mba.payment values ('fac8f71d-5124-51cb-98a3-63492862e4e3', 'e6c5df67-3462-549b-84a9-3df7a9fdbfa9',6000,'2022-01-05T10:00:00');