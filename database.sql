<<<<<<< HEAD
CREATE DATABASE IF NOT EXISTS trazabilidad;
USE trazabilidad;
CREATE TABLE users(
  id                INT (255) AUTO_INCREMENT NOT NULL,
  name              VARCHAR (50) NOT NULL,
  surname           VARCHAR (100) NOT NULL,
  role              VARCHAR (20),
  nick              VARCHAR (50), NOT NULL, 
  password          VARCHAR (255) NOT NULL,
  description       TEXT,
  image             VARCHAR (255),
  created_at        DATETIME DEFAULT NULL,
  updated_at        DATETIME DEFAULT NULL,
  remember_token    VARCHAR (255),
  CONSTRAINT pk_users PRIMARY KEY (id)
)ENGINE = InnoDb;
CREATE TABLE zone(
  id            INT (255) AUTO_INCREMENT NOT NULL,
  zone          VARCHAR (50) NOT NULL,
  description   TEXT,
  created_at     DATETIME DEFAULT NULL,
  updated_at    DATETIME DEFAULT NULL,
  CONSTRAINT pk_zone PRIMARY KEY (id)
)ENGINE = InnoDb;
CREATE TABLE packaging_line(
  id                INT (255) AUTO_INCREMENT NOT NULL,
  packaging_line    VARCHAR (50) NOT NULL,
  description       TEXT,
  created_at         DATETIME DEFAULT NULL,
  updated_at        DATETIME DEFAULT NULL,
  CONSTRAINT pk_packaging_line PRIMARY KEY (id)
)ENGINE = InnoDb;
CREATE TABLE estate(
    id                  INT (255) AUTO_INCREMENT NOT NULL, 
    place               VARCHAR (255),
    route               VARCHAR (255),
    province            VARCHAR (255),
    industrial_park     VARCHAR (255),
    plot                VARCHAR (255),
    gps                 VARCHAR (255),
    description         TEXT, 
    created_at          DATETIME DEFAULT NULL,
    updated_at          DATETIME DEFAULT NULL,
    CONSTRAINT pk_estate PRIMARY KEY (id)
)ENGINE = InnoDb;
CREATE TABLE container(
    id              INT (255) AUTO_INCREMENT NOT NULL,
    container       VARCHAR (255),
    weight          INT (255),
    description     TEXT, 
    created_at      DATETIME DEFAULT NULL,
    updated_at      DATETIME DEFAULT NULL,
    CONSTRAINT pk_format PRIMARY KEY (id)
) ENGINE = InnoDb;
CREATE TABLE buyer(
    id              INT (255) AUTO_INCREMENT NOT NULL,
    cif             VARCHAR (9) NOT NULL, 
    company         VARCHAR (255) NOT NULL,  
    direction       VARCHAR (100) NOT NULL, 
    location        VARCHAR (100) NOT NULL,    
    province        VARCHAR (100) NOT NULL, 
    postcode        VARCHAR (10) NOT NULL, 
    country         VARCHAR (100) NOT NULL,    
    storehouse      VARCHAR (100),
    description     TEXT, 
    created_at      DATETIME DEFAULT NULL,
    updated_at      DATETIME DEFAULT NULL,
    CONSTRAINT pk_buyer PRIMARY KEY (id)
)ENGINE = InnoDb;
CREATE TABLE article(
    id              INT (255) AUTO_INCREMENT NOT NULL,
    article         VARCHAR (100) NOT NULL, 
    description     TEXT, 
    created_at      DATETIME DEFAULT NULL,
    updated_at      DATETIME DEFAULT NULL,
    CONSTRAINT pk_article PRIMARY KEY (id)
) ENGINE = InnoDb;
CREATE TABLE carriers(
    id              INT (255) AUTO_INCREMENT NOT NULL,
    company         VARCHAR (255) NOT NULL, 
    description     TEXT, 
    created_at      DATETIME DEFAULT NULL,
    updated_at      DATETIME DEFAULT NULL,
    CONSTRAINT pk_carriers PRIMARY KEY (id)
)ENGINE = InnoDB;
CREATE TABLE farmer(
    id             INT (255) AUTO_INCREMENT NOT NULL,
    zone_id        INT (255) NOT NULL, 
    nif            VARCHAR (9) NOT NULL,  
    name           VARCHAR (50) NOT NULL,  
    surname        VARCHAR (100) NOT NULL,  
    direction      VARCHAR (100) NOT NULL,  
    location       VARCHAR (100) NOT NULL,
    province       VARCHAR (100) NOT NULL,
    postcode       VARCHAR (10), 
    description    TEXT, 
    created_at     DATETIME DEFAULT NULL,
    updated_at     DATETIME DEFAULT NULL,
    CONSTRAINT pk_farmer PRIMARY KEY (id),
    CONSTRAINT fk_farmer_zone FOREIGN KEY (zone_id) REFERENCES zone(id)
)ENGINE = InnoDb;
CREATE TABLE notebook(
    id             INT (255) AUTO_INCREMENT NOT NULL,
    estate_id      INT (255) NOT NULL, 
    farmer_id      INT (255) NOT NULL, 
    description    TEXT, 
    created_at     DATETIME DEFAULT NULL,
    updated_at     DATETIME DEFAULT NULL,
    CONSTRAINT pk_notebook PRIMARY KEY (id),
    CONSTRAINT fk_notebook_estate FOREIGN KEY (estate_id) REFERENCES estate(id),
    CONSTRAINT fk_notebook_farmer FOREIGN KEY (farmer_id) REFERENCES farmer(id)
)ENGINE = InnoDb;
CREATE TABLE process(
    id             INT (255) AUTO_INCREMENT NOT NULL, 
    notebook_id    INT (255) NOT NULL, 
    process        VARCHAR (255) NOT NULL,  
    dated          VARCHAR (25),  
    description    TEXT, 
    created_at     DATETIME DEFAULT NULL,
    updated_at     DATETIME DEFAULT NULL,
    CONSTRAINT pk_proces PRIMARY KEY (id),
    CONSTRAINT fk_notebook_id FOREIGN KEY (notebook_id) REFERENCES notebook(id)
)ENGINE = InnoDb;
CREATE TABLE entry_lot(
    id               INT (255) AUTO_INCREMENT NOT NULL,
    article_id       INT (255) NOT NULL,
    notebook_id      INT (255) NOT NULL,   
    carrier_id       INT (255) NOT NULL,             
    gross            INT (255),
    tare             INT (255),   
    packaged         INT (255),   
    discount         VARCHAR (255),   
    number_plate     VARCHAR (20),   
    used             TINYINT,    
    description      TEXT, 
    created_at       DATETIME DEFAULT NULL,
    updated_at       DATETIME DEFAULT NULL,
    CONSTRAINT pk_entry_lot PRIMARY KEY (id),
    CONSTRAINT fk_entry_lot_article FOREIGN KEY (article_id) REFERENCES article(id),
    CONSTRAINT fk_entry_lot_notebook FOREIGN KEY (notebook_id) REFERENCES notebook(id),
    CONSTRAINT fk_entry_lot_carrier FOREIGN KEY (carrier_id) REFERENCES carriers(id)
)ENGINE = InnoDb;
CREATE TABLE output_detail(
    id                  INT (255) AUTO_INCREMENT NOT NULL,
    packaging_line_id   INT (255) NOT NULL,
    entry_lot_id        INT (255) NOT NULL,
    kg_used             INT (255),
    description         TEXT, 
    created_at          DATETIME DEFAULT NULL,
    updated_at          DATETIME DEFAULT NULL,
    CONSTRAINT pk_output_detail PRIMARY KEY (id),
    CONSTRAINT fk_output_detail_packging FOREIGN KEY (packaging_line_id) REFERENCES packaging_line(id),
    CONSTRAINT fk_output_detail_entry_lot FOREIGN KEY (entry_lot_id) REFERENCES entry_lot(id)
)ENGINE = InnoDB;
CREATE TABLE batch_output(
    id                  INT (255) AUTO_INCREMENT NOT NULL,
    buyer_id            INT (255) NOT NULL,
    article_id          INT (255) NOT NULL,
    carriers_id         INT (255) NOT NULL,
    completed           TINYINT, 
    loaded              TINYINT, 
    description         TEXT, 
    created_at          DATETIME DEFAULT NULL,
    updated_at          DATETIME DEFAULT NULL,
    CONSTRAINT pk_batch_output PRIMARY KEY (id),
    CONSTRAINT fk_batch_output_buyer FOREIGN KEY (buyer_id) REFERENCES buyer(id),
    CONSTRAINT fk_batch_output_article FOREIGN KEY (article_id) REFERENCES article(id),
    CONSTRAINT fk_batch_output_carriers FOREIGN KEY (carriers_id) REFERENCES carriers(id)
)ENGINE = InnoDb;
CREATE TABLE pale(
    id                  INT (255) AUTO_INCREMENT NOT NULL,
    packaging_line_id   INT (255) NOT NULL,
    container_id        INT (255) NOT NULL,
    batch_output_id     INT (255) NOT NULL,
    gross               INT (255) NOT NULL,
    tare                INT (255) NOT NULL,
    packaged            VARCHAR (100),
    pieces              INT (255) NOT NULL,
    description         TEXT, 
    created_at          DATETIME DEFAULT NULL,
    updated_at          DATETIME DEFAULT NULL,
    CONSTRAINT pk_pale PRIMARY KEY (id),
    CONSTRAINT fk_pale_packaging FOREIGN KEY (packaging_line_id) REFERENCES packaging_line(id),
    CONSTRAINT fk_pale_container FOREIGN KEY (container_id) REFERENCES container(id),
    CONSTRAINT fk_pale_batch_output FOREIGN KEY (batch_output_id) REFERENCES batch_output(id)
)ENGINE = InnoDb;
CREATE TABLE report(
    id                  INT (255) AUTO_INCREMENT NOT NULL,
    batch_output_id     INT (255),
    entry_lot_id        INT (255),    
    incidence           TEXT NOT NULL,
    solution            TEXT, 
    created_at          DATETIME DEFAULT NULL,
    updated_at          DATETIME DEFAULT NULL,
    CONSTRAINT pk_report PRIMARY KEY (id),
    CONSTRAINT fk_report_batch_output FOREIGN KEY (batch_output_id) REFERENCES batch_output(id),
    CONSTRAINT fk_report_entry_lot_id FOREIGN KEY (entry_lot_id) REFERENCES entry_lot(id)
=======
CREATE DATABASE IF NOT EXISTS trazabilidad;
USE trazabilidad;
CREATE TABLE users(
  id                INT (255) AUTO_INCREMENT NOT NULL,
  name              VARCHAR (50) NOT NULL,
  surname           VARCHAR (100) NOT NULL,
  role              VARCHAR (20),
  nick              VARCHAR (50), NOT NULL, 
  password          VARCHAR (255) NOT NULL,
  description       TEXT,
  image             VARCHAR (255),
  created_at        DATETIME DEFAULT NULL,
  updated_at        DATETIME DEFAULT NULL,
  remember_token    VARCHAR (255),
  CONSTRAINT pk_users PRIMARY KEY (id)
)ENGINE = InnoDb;
CREATE TABLE zone(
  id            INT (255) AUTO_INCREMENT NOT NULL,
  zone          VARCHAR (50) NOT NULL,
  description   TEXT,
  created_at     DATETIME DEFAULT NULL,
  updated_at    DATETIME DEFAULT NULL,
  CONSTRAINT pk_zone PRIMARY KEY (id)
)ENGINE = InnoDb;
CREATE TABLE packaging_line(
  id                INT (255) AUTO_INCREMENT NOT NULL,
  packaging_line    VARCHAR (50) NOT NULL,
  description       TEXT,
  created_at         DATETIME DEFAULT NULL,
  updated_at        DATETIME DEFAULT NULL,
  CONSTRAINT pk_packaging_line PRIMARY KEY (id)
)ENGINE = InnoDb;
CREATE TABLE estate(
    id                  INT (255) AUTO_INCREMENT NOT NULL, 
    place               VARCHAR (255),
    route               VARCHAR (255),
    province            VARCHAR (255),
    industrial_park     VARCHAR (255),
    plot                VARCHAR (255),
    gps                 VARCHAR (255),
    description         TEXT, 
    created_at          DATETIME DEFAULT NULL,
    updated_at          DATETIME DEFAULT NULL,
    CONSTRAINT pk_estate PRIMARY KEY (id)
)ENGINE = InnoDb;
CREATE TABLE container(
    id              INT (255) AUTO_INCREMENT NOT NULL,
    container       VARCHAR (255),
    weight          INT (255),
    description     TEXT, 
    created_at      DATETIME DEFAULT NULL,
    updated_at      DATETIME DEFAULT NULL,
    CONSTRAINT pk_format PRIMARY KEY (id)
) ENGINE = InnoDb;
CREATE TABLE buyer(
    id              INT (255) AUTO_INCREMENT NOT NULL,
    cif             VARCHAR (9) NOT NULL, 
    company         VARCHAR (255) NOT NULL,  
    direction       VARCHAR (100) NOT NULL, 
    location        VARCHAR (100) NOT NULL,    
    province        VARCHAR (100) NOT NULL, 
    postcode        VARCHAR (10) NOT NULL, 
    country         VARCHAR (100) NOT NULL,    
    storehouse      VARCHAR (100),
    description     TEXT, 
    created_at      DATETIME DEFAULT NULL,
    updated_at      DATETIME DEFAULT NULL,
    CONSTRAINT pk_buyer PRIMARY KEY (id)
)ENGINE = InnoDb;
CREATE TABLE article(
    id              INT (255) AUTO_INCREMENT NOT NULL,
    article         VARCHAR (100) NOT NULL, 
    description     TEXT, 
    created_at      DATETIME DEFAULT NULL,
    updated_at      DATETIME DEFAULT NULL,
    CONSTRAINT pk_article PRIMARY KEY (id)
) ENGINE = InnoDb;
CREATE TABLE carriers(
    id              INT (255) AUTO_INCREMENT NOT NULL,
    company         VARCHAR (255) NOT NULL, 
    description     TEXT, 
    created_at      DATETIME DEFAULT NULL,
    updated_at      DATETIME DEFAULT NULL,
    CONSTRAINT pk_carriers PRIMARY KEY (id)
)ENGINE = InnoDB;
CREATE TABLE farmer(
    id             INT (255) AUTO_INCREMENT NOT NULL,
    zone_id        INT (255) NOT NULL, 
    nif            VARCHAR (9) NOT NULL,  
    name           VARCHAR (50) NOT NULL,  
    surname        VARCHAR (100) NOT NULL,  
    direction      VARCHAR (100) NOT NULL,  
    location       VARCHAR (100) NOT NULL,
    province       VARCHAR (100) NOT NULL,
    postcode       VARCHAR (10), 
    description    TEXT, 
    created_at     DATETIME DEFAULT NULL,
    updated_at     DATETIME DEFAULT NULL,
    CONSTRAINT pk_farmer PRIMARY KEY (id),
    CONSTRAINT fk_farmer_zone FOREIGN KEY (zone_id) REFERENCES zone(id)
)ENGINE = InnoDb;
CREATE TABLE notebook(
    id             INT (255) AUTO_INCREMENT NOT NULL,
    estate_id      INT (255) NOT NULL, 
    farmer_id      INT (255) NOT NULL, 
    description    TEXT, 
    created_at     DATETIME DEFAULT NULL,
    updated_at     DATETIME DEFAULT NULL,
    CONSTRAINT pk_notebook PRIMARY KEY (id),
    CONSTRAINT fk_notebook_estate FOREIGN KEY (estate_id) REFERENCES estate(id),
    CONSTRAINT fk_notebook_farmer FOREIGN KEY (farmer_id) REFERENCES farmer(id)
)ENGINE = InnoDb;
CREATE TABLE process(
    id             INT (255) AUTO_INCREMENT NOT NULL, 
    notebook_id    INT (255) NOT NULL, 
    process        VARCHAR (255) NOT NULL,  
    dated          VARCHAR (25),  
    description    TEXT, 
    created_at     DATETIME DEFAULT NULL,
    updated_at     DATETIME DEFAULT NULL,
    CONSTRAINT pk_proces PRIMARY KEY (id),
    CONSTRAINT fk_notebook_id FOREIGN KEY (notebook_id) REFERENCES notebook(id)
)ENGINE = InnoDb;
CREATE TABLE entry_lot(
    id               INT (255) AUTO_INCREMENT NOT NULL,
    article_id       INT (255) NOT NULL,
    notebook_id      INT (255) NOT NULL,   
    carrier_id       INT (255) NOT NULL,             
    gross            INT (255),
    tare             INT (255),   
    package          VARCHAR (100),   
    discount         INT (255),   
    number_plate     VARCHAR (20),   
    used             TINYINT,    
    description      TEXT, 
    created_at       DATETIME DEFAULT NULL,
    updated_at       DATETIME DEFAULT NULL,
    CONSTRAINT pk_entry_lot PRIMARY KEY (id),
    CONSTRAINT fk_entry_lot_article FOREIGN KEY (article_id) REFERENCES article(id),
    CONSTRAINT fk_entry_lot_notebook FOREIGN KEY (notebook_id) REFERENCES notebook(id),
    CONSTRAINT fk_entry_lot_carrier FOREIGN KEY (carrier_id) REFERENCES carriers(id)
)ENGINE = InnoDb;
CREATE TABLE output_detail(
    id                  INT (255) AUTO_INCREMENT NOT NULL,
    packaging_line_id   INT (255) NOT NULL,
    entry_lot_id        INT (255) NOT NULL,
    kg_used             INT (255),
    description         TEXT, 
    created_at          DATETIME DEFAULT NULL,
    updated_at          DATETIME DEFAULT NULL,
    CONSTRAINT pk_output_detail PRIMARY KEY (id),
    CONSTRAINT fk_output_detail_packging FOREIGN KEY (packaging_line_id) REFERENCES packaging_line(id),
    CONSTRAINT fk_output_detail_entry_lot FOREIGN KEY (entry_lot_id) REFERENCES entry_lot(id)
)ENGINE = InnoDB;
CREATE TABLE batch_output(
    id                  INT (255) AUTO_INCREMENT NOT NULL,
    buyer_id            INT (255) NOT NULL,
    article_id          INT (255) NOT NULL,
    carriers_id         INT (255) NOT NULL,
    completed           TINYINT, 
    loaded              TINYINT, 
    description         TEXT, 
    created_at          DATETIME DEFAULT NULL,
    updated_at          DATETIME DEFAULT NULL,
    CONSTRAINT pk_batch_output PRIMARY KEY (id),
    CONSTRAINT fk_batch_output_buyer FOREIGN KEY (buyer_id) REFERENCES buyer(id),
    CONSTRAINT fk_batch_output_article FOREIGN KEY (article_id) REFERENCES article(id),
    CONSTRAINT fk_batch_output_carriers FOREIGN KEY (carriers_id) REFERENCES carriers(id)
)ENGINE = InnoDb;
CREATE TABLE pale(
    id                  INT (255) AUTO_INCREMENT NOT NULL,
    packaging_line_id   INT (255) NOT NULL,
    container_id        INT (255) NOT NULL,
    batch_output_id     INT (255) NOT NULL,
    gross               INT (255) NOT NULL,
    tare                INT (255) NOT NULL,
    package             VARCHAR (100),
    pieces              INT (255) NOT NULL,
    description         TEXT, 
    created_at          DATETIME DEFAULT NULL,
    updated_at          DATETIME DEFAULT NULL,
    CONSTRAINT pk_pale PRIMARY KEY (id),
    CONSTRAINT fk_pale_packaging FOREIGN KEY (packaging_line_id) REFERENCES packaging_line(id),
    CONSTRAINT fk_pale_container FOREIGN KEY (container_id) REFERENCES container(id),
    CONSTRAINT fk_pale_batch_output FOREIGN KEY (batch_output_id) REFERENCES batch_output(id)
)ENGINE = InnoDb;
CREATE TABLE report(
    id                  INT (255) AUTO_INCREMENT NOT NULL,
    batch_output_id     INT (255),
    entry_lot_id        INT (255),    
    incidence           VARCHAR (255) NOT NULL,
    solution            VARCHAR (255) NOT NULL,
    description         TEXT, 
    created_at          DATETIME DEFAULT NULL,
    updated_at          DATETIME DEFAULT NULL,
    CONSTRAINT pk_report PRIMARY KEY (id),
    CONSTRAINT fk_report_batch_output FOREIGN KEY (batch_output_id) REFERENCES batch_output(id),
    CONSTRAINT fk_report_entry_lot_id FOREIGN KEY (entry_lot_id) REFERENCES entry_lot(id)
>>>>>>> 30355c894d38a2a520e7d118c6f310d27ad5213f
)ENGINE = InnoDb;