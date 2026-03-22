DO $$
DECLARE
    comp_record RECORD;
    role_admin UUID;
    role_tech UUID;
    skill_rec RECORD;
    tool_rec RECORD;
    tech_rec RECORD;
BEGIN
    -- Populate Roles
    INSERT INTO roles (name, description) VALUES ('ADMIN', 'Administrator') RETURNING id INTO role_admin;
    INSERT INTO roles (name, description) VALUES ('TECHNICIAN', 'Field Tech') RETURNING id INTO role_tech;
    INSERT INTO roles (name, description) VALUES ('DISPATCHER', 'Dispatcher');
    INSERT INTO roles (name, description) VALUES ('CUSTOMER', 'Customer');

    -- Insert 4 Companies (Tenants)
    INSERT INTO companies (company_name, industry) VALUES 
        ('Arctic HVAC Solutions', 'HVAC'),
        ('Brothers Plumbing', 'PLUMBING'),
        ('Tesla Electricals', 'ELECTRICAL'),
        ('StainBusters Cleaning', 'CLEANING');

    FOR comp_record IN SELECT id, industry FROM companies LOOP
        -- 1. Create 1 Admin for Company
        INSERT INTO users (company_id, role_id, email, first_name, last_name) 
        VALUES (comp_record.id, role_admin, 'admin@' || lower(comp_record.industry) || 'test.com', 'Admin', comp_record.industry);

        -- 2. Create 5 Technicians for Company
        FOR i IN 1..5 LOOP
            INSERT INTO users (company_id, role_id, email, first_name, last_name)
            VALUES (comp_record.id, role_tech, 'tech' || i || '@' || lower(comp_record.industry) || 'test.com', 'Tech' || i, comp_record.industry);
        END LOOP;

        -- 3. Create 10 Customers for Company
        FOR i IN 1..10 LOOP
            INSERT INTO customers (company_id, first_name, last_name, email)
            VALUES (comp_record.id, 'Cust' || i, comp_record.industry, 'cust' || i || '@' || lower(comp_record.industry) || 'customers.com');
        END LOOP;
        
        -- 4. Insert Industry-Specific Skills & Tools
        IF comp_record.industry = 'HVAC' THEN
            INSERT INTO skills (company_id, name) VALUES (comp_record.id, 'AC Repair'), (comp_record.id, 'Furnace Install');
            INSERT INTO tools (company_id, name) VALUES (comp_record.id, 'Refrigerant Gauge'), (comp_record.id, 'Vacuum Pump');
        ELSIF comp_record.industry = 'PLUMBING' THEN
            INSERT INTO skills (company_id, name) VALUES (comp_record.id, 'Pipe Joining'), (comp_record.id, 'Toilet Installation');
            INSERT INTO tools (company_id, name) VALUES (comp_record.id, 'Pipe Wrench'), (comp_record.id, 'Drain Snake');
        ELSIF comp_record.industry = 'ELECTRICAL' THEN
            INSERT INTO skills (company_id, name) VALUES (comp_record.id, 'Panel Upgrade'), (comp_record.id, 'High Voltage Wiring');
            INSERT INTO tools (company_id, name) VALUES (comp_record.id, 'Multimeter'), (comp_record.id, 'Wire Strippers');
        ELSIF comp_record.industry = 'CLEANING' THEN
            INSERT INTO skills (company_id, name) VALUES (comp_record.id, 'Steam Cleaning'), (comp_record.id, 'Stain Removal');
            INSERT INTO tools (company_id, name) VALUES (comp_record.id, 'Carpet Extractor'), (comp_record.id, 'Upholstery Tool');
        END IF;

        -- 5. Map the Skills & Tools to the 5 Technicians via Junction Tables
        FOR tech_rec IN SELECT id FROM users WHERE company_id = comp_record.id AND role_id = role_tech LOOP
            -- Assign skills with random expertise level 1-5
            FOR skill_rec IN SELECT id FROM skills WHERE company_id = comp_record.id LOOP
                INSERT INTO technician_skills (technician_id, skill_id, expertise_level) 
                VALUES (tech_rec.id, skill_rec.id, floor(random() * 5 + 1)::int);
            END LOOP;
            
            -- Assign tools
            FOR tool_rec IN SELECT id FROM tools WHERE company_id = comp_record.id LOOP
                INSERT INTO technician_tools (technician_id, tool_id) 
                VALUES (tech_rec.id, tool_rec.id);
            END LOOP;
        END LOOP;

    END LOOP;
END $$;
