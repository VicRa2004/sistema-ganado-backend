DROP DATABASE IF EXISTS campo_db;

CREATE DATABASE campo_db;

USE campo_db;
 
CREATE TABLE campo_db.tbUsuarios (
	user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_nombre VARCHAR(100),
    user_password VARCHAR(20) 
);

CREATE TABLE campo_db.tbAdministrador (
	admin_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    admin_nombre VARCHAR(100),
    admin_password VARCHAR(20)
);

CREATE TABLE campo_db.tbPropietario (
	propietario_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    propietario_nombre VARCHAR(100),
    propietario_user_id INT NOT NULL,
    FOREIGN KEY (propietario_user_id) REFERENCES tbUsuarios(user_id)
);

CREATE TABLE campo_db.tbTerrenos (
	terreno_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    terreno_nombre VARCHAR(150),
    terreno_foto VARCHAR(200),
    terreno_upp VARCHAR(100),
    terreno_propietario_id INT NOT NULL,
    -- terreno_user_id INT NOT NULL,
    FOREIGN KEY (terreno_propietario_id) REFERENCES tbPropietario(propietario_id)
    -- FOREIGN KEY (terreno_user_id) REFERENCES tbUsuarios(user_id)
);

CREATE TABLE campo_db.tbRazas (
	raza_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    raza_nombre VARCHAR(100),
    raza_descripcion VARCHAR(500),
    raza_img VARCHAR(200) -- Quiza sea mejor no poner esto
);

CREATE TABLE campo_db.tbFierros (
	fierro_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fierro_foto VARCHAR(200),
	fierro_propietario_id INT, -- Repetido con ganado
    -- fierro_user_id INT NOT NULL,
    FOREIGN KEY (fierro_propietario_id) REFERENCES tbPropietario(propietario_id)
    -- FOREIGN KEY (fierro_user_id) REFERENCES tbUsuarios(user_id)
);

CREATE TABLE campo_db.tbGanados (
	ganado_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ganado_descripcion VARCHAR(250),
    ganado_madre INT,
    ganado_padre INT,
    ganado_sexo VARCHAR(1),
    ganado_arete_n1 VARCHAR(4),
    ganado_arete_n2 VARCHAR(20),
    ganado_color VARCHAR(20),
    ganado_fecha_nacimiento DATE,
    ganado_fecha_baja DATE,
    ganado_num_registro VARCHAR(10), -- Preguntar que es
    ganado_observaciones VARCHAR(500),
    ganado_foto VARCHAR(200),
    ganado_motivo_baja VARCHAR(200),
    ganado_fierro_id INT NOT NULL,
    ganado_raza_id INT NOT NULL,
    ganado_propietario_id INT NOT NULL,
    -- ganado_user_id INT NOT NULL,
    FOREIGN KEY (ganado_fierro_id) REFERENCES tbFierros(fierro_id),
    FOREIGN KEY (ganado_raza_id) REFERENCES tbRazas(raza_id),
    FOREIGN KEY (ganado_propietario_id) REFERENCES tbPropietario(propietario_id)
    -- FOREIGN KEY (ganado_user_id) REFERENCES tbUsuarios(user_id)
);

CREATE TABLE campo_db.tbRegistroCrias (
	reg_cria_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    reg_cria_ultima_vez DATE,
    reg_cria_ganado_id INT NOT NULL,
    FOREIGN KEY (reg_cria_ganado_id) REFERENCES tbGanados(ganado_id)
);

-- Tabla de realcion para saber que ganado
CREATE TABLE campo_db.tbGanadoCampo (
	gnd_cmp_id INT NOT NULL PRIMARY KEY,
    gnd_cmp_terreno_id INT NOT NULL,
    gnd_cmp_ganado_id INT NOT NULL,
    -- gnd_cmp_user_id INT NOT NULL,
    FOREIGN KEY (gnd_cmp_terreno_id) REFERENCES tbTerrenos(terreno_id),
    FOREIGN KEY (gnd_cmp_ganado_id) REFERENCES tbGanados(ganado_id)
    -- FOREIGN KEY (gnd_cmp_user_id) REFERENCES tbUsuarios(user_id)
);









