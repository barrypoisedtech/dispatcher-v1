CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. companies
CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name VARCHAR NOT NULL,
    industry VARCHAR,
    subscription_tier VARCHAR,
    subscription_status VARCHAR,
    contact_email VARCHAR,
    phone_number VARCHAR,
    branding_css_url TEXT,
    branding_logo_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. roles
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL UNIQUE,
    description TEXT,
    permissions JSONB
);

-- 3. users (technicians, dispatchers, admins)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id),
    role_id UUID REFERENCES roles(id),
    oauth_provider VARCHAR,
    oauth_uid VARCHAR,
    email VARCHAR,
    first_name VARCHAR,
    last_name VARCHAR,
    phone_number VARCHAR,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. customers
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id),
    first_name VARCHAR,
    last_name VARCHAR,
    email VARCHAR,
    phone VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. work_orders
CREATE TABLE IF NOT EXISTS work_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id),
    customer_id UUID REFERENCES customers(id),
    status VARCHAR,
    priority VARCHAR,
    scheduled_start TIMESTAMP WITH TIME ZONE,
    scheduled_end TIMESTAMP WITH TIME ZONE,
    assigned_technician_id UUID REFERENCES users(id),
    service_location TEXT,
    dispatcher_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. work_order_items
CREATE TABLE IF NOT EXISTS work_order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    work_order_id UUID REFERENCES work_orders(id),
    task_name VARCHAR,
    description TEXT,
    status VARCHAR,
    estimated_duration INTERVAL,
    price DECIMAL(10, 2),
    technician_notes TEXT
);

-- 7. skills
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id),
    name VARCHAR,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. tools
CREATE TABLE IF NOT EXISTS tools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id),
    name VARCHAR,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. assignments
CREATE TABLE IF NOT EXISTS assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id),
    work_order_id UUID REFERENCES work_orders(id),
    technician_id UUID REFERENCES users(id),
    status VARCHAR,
    route_order INTEGER,
    estimated_arrival TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. work_specs
CREATE TABLE IF NOT EXISTS work_specs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id),
    title VARCHAR,
    description TEXT,
    estimated_duration INTERVAL,
    required_skill_level INTEGER,
    base_price DECIMAL(10, 2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. technician_schedules
CREATE TABLE IF NOT EXISTS technician_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    technician_id UUID REFERENCES users(id),
    shift_start TIMESTAMP WITH TIME ZONE,
    shift_end TIMESTAMP WITH TIME ZONE,
    status VARCHAR
);

-- 12. technician_locations
CREATE TABLE IF NOT EXISTS technician_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    technician_id UUID REFERENCES users(id),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    ping_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 13. Junction Tables
CREATE TABLE IF NOT EXISTS work_spec_skills (
    work_spec_id UUID REFERENCES work_specs(id),
    skill_id UUID REFERENCES skills(id),
    PRIMARY KEY (work_spec_id, skill_id)
);

CREATE TABLE IF NOT EXISTS work_spec_tools (
    work_spec_id UUID REFERENCES work_specs(id),
    tool_id UUID REFERENCES tools(id),
    PRIMARY KEY (work_spec_id, tool_id)
);

CREATE TABLE IF NOT EXISTS technician_skills (
    technician_id UUID REFERENCES users(id),
    skill_id UUID REFERENCES skills(id),
    expertise_level INTEGER,
    PRIMARY KEY (technician_id, skill_id)
);

CREATE TABLE IF NOT EXISTS technician_tools (
    technician_id UUID REFERENCES users(id),
    tool_id UUID REFERENCES tools(id),
    PRIMARY KEY (technician_id, tool_id)
);
