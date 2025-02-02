CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role_id INTEGER NOT NULL,
  phone_number VARCHAR(15),
  points INTEGER DEFAULT 0,
  is_deleted SMALLINT DEFAULT 0
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  role_name VARCHAR(50) NOT NULL
);


CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(255),
  price_per_kg  DECIMAL(10,2),
  price_per_dimensions DECIMAL(10,2),
  points_per_kg INTEGER,
  is_deleted SMALLINT DEFAULT 0
  
);

CREATE TABLE orders (

  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,  
  category_id INTEGER REFERENCES category(id),
  collector_id INTEGER REFERENCES users(id),
  admin_id INTEGER REFERENCES users(id),
  predicted_price DECIMAL (10,2),
  last_price INTEGER,
  description TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  weight DECIMAL (10,2) 
  length DECIMAL (10,2)
  width DECIMAL (10,2)
  height DECIMAL (10,2)
  order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  arrive_time TIMESTAMP,
  location VARCHAR(255)
);

CREATE TABLE role_permission (
  role_id INTEGER NOT NULL,
  permission_id INTEGER NOT NULL,
  PRIMARY KEY (role_id, permission_id),
  CONSTRAINT fk_role
    FOREIGN KEY (role_id) 
    REFERENCES roles(id) 
    ON DELETE CASCADE,
  CONSTRAINT fk_permission
    FOREIGN KEY (permission_id) 
    REFERENCES permissions(id) 
    ON DELETE CASCADE
);

CREATE TABLE permissions (
  id SERIAL PRIMARY KEY,
  permission_name VARCHAR(255) NOT NULL,
  description TEXT
)
