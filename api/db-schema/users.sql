CREATE TABLE users (
    id SERIAL PRIMARY KEY,                 -- Auto-incrementing primary key
    email VARCHAR(255) UNIQUE NOT NULL,    -- Email must be unique and not null
    password VARCHAR(255) NOT NULL,        -- Storing password (hashed)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Automatically set on row creation
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Set manually or by trigger
);
