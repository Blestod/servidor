--crearMedicion.sql

create table Medicion (
    idMedicion int not null,
    o3 int(3) not null,
    temperatura float(3) not null,
    fecha DATETIME not null,
    lugar POINT not null,
    primary key (idMedicion)
);