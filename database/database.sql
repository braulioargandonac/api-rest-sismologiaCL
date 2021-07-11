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
    fecha_utc text not null,
    latitud text not null,
    longitud text not null,
    profundidad text not null,
    magnitud text not null,
    agencia text not null,
    referencia text not null
);