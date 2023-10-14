-- crearDispositivo.sql

create table Dispositivo (
    id varchar(20) not null,
    idMediciones int not null,
    primary key (id)
    foreign key (idMediciones) references Medicion(idMedicion),
);

