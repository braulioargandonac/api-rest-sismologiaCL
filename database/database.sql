create database sismologia;

create table users(
    id serial primary key not null,
    nombre text not null,            --text permite contener cadenas de longitud ilimitada
    email text not null,
    pass text not null
);

create table sismo(
    id serial primary key not null,
    fecha_local text not null,
    latitud double precision not null,
    longitud double precision not null,
    profundidad int not null,
    magnitud double precision not null,
    referencia text not null
);

insert into users (nombre, email, pass) values
    ('Juan', 'Juan@gmail.com', 'clave'),
    ('Jorge', 'Jorge@gmail.com', 'clave');