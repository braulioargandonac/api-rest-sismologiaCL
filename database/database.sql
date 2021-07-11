create database sismologia;

create table users(
    id serial primary key not null, 
    name varchar(255) not null,
    email text not null
);

insert into users(name, email) values
    ('kevin', 'kevin.salinasv@utem.cl'),
    ('kvn', 'ljrflkfdj@gmail.com');