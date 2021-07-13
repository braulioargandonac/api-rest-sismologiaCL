create database sismologia; -- se crea la base de datos sismologia

drop table if exists users cascade;
create table users( -- tabla de usuario
    id serial primary key not null,
    nombre text not null,            --text permite contener cadenas de longitud ilimitada
    email text not null,
    pass text not null
);

drop table if exists sismo cascade;
create table sismo( --tabla de sismo
    id serial primary key not null,
    fecha_local text not null,
    latitud double precision not null,
    longitud double precision not null,
    profundidad int not null,
    magnitud double precision not null,
    referencia text not null
);