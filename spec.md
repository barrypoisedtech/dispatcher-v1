# Dispatcher V1 - Project Specification

## 1. App Overview
The application is a Software-as-a-Service (SaaS) work order dispatch and routing system. It is designed specifically for small to medium-sized HVAC, electrical, and plumbing companies that need to create work orders and dispatch technicians to customer locations. Multiple companies will sign up and use this application independently.

### Core Functionality
- **Work Order Creation:** Users can generate new work orders.
- **Technician Matching:** Work orders are assigned to technicians based on:
  - Rule-based attributes
  - Objective-based routing
  - Route-based optimization routing

### User Interfaces
The application will feature four distinct views:
1. **Admin Section:** For the management team of each signed-up utility company to configure platform settings, manage their dispatchers and technicians, and oversee their company account.
2. **Dispatcher View:** For users creating, managing, and overseeing work orders and routing.
3. **Technician View:** For technicians to receive, view, and manage their assigned work orders.
4. **Customer Portal:** For the end customers of the utility companies to log in, check the status of their work orders, and track dispatches.

## 2. Tech Stack
- **Backend:** Java
- **Frontend:** TypeScript / JavaScript with React (for the UI). The application will be a **Progressive Web App (PWA)** to provide a reliable, native-like mobile and desktop experience. Additionally, the architecture will be designed with **Module Federation** in mind, allowing components to be created once and embedded in multiple locations.
- **Database:** PostgreSQL (chosen for its robust features and ability to handle large SaaS platforms)

## 3. Architecture & Security
- **Multi-Tenancy (SaaS):** The application will allow multiple companies to sign up and operate on the same platform.
- **Security & Data Isolation:** Strict data isolation is a top priority. Tenant isolation will be enforced natively at the database level utilizing PostgreSQL's **Row-Level Security (RLS)**. This ensures that each company's account and their respective customers' data are completely separated, preventing any company from querying or seeing another company's records.
- **Authentication & Identity Management:** To minimize security vulnerabilities, the application will not store or manage user passwords directly. Authentication will be handled exclusively via trusted third-party OAuth providers (such as **Google** and **Apple**), allowing users to log in securely using their existing accounts.
  - ***Development & PoC Override:*** During the design and proof-of-concept phase, the application will feature a local 'Role-Switching' (or Impersonation) utility. This will allow you to instantly toggle between different roles (Admin, Dispatcher, Technician, Customer) and different companies (tenants) to easily verify data isolation and UI workflows without requiring numerous OAuth accounts.

## 4. Observability & Monitoring
- **OpenTelemetry:** OpenTelemetry will be the standard for tracing all calls between services and to the database, ensuring full end-to-end tracking and visibility.
- **Prometheus & Grafana:** Prometheus endpoints will be exposed to collect metrics, allowing Grafana to be implemented for robust alerting, monitoring, and visualizing the health of the application.

## 5. Deployment & Infrastructure
- **Local Development:** During the building phase, the entire application stack will be containerized and run locally using **Docker**.
- **Production Hosting:** *To be determined* (Hosting provider will be evaluated and decided in a future phase before public release).

## 6. Third-Party Integrations
- **Mapping & Routing:** OpenStreetMap will be utilized to provide free or low-cost mapping and location data necessary for the route optimization engine.
- **Notifications:** A notification provider will be selected that supports omni-channel alerting, ensuring customers can specify their preferred method of notification (e.g., SMS, Email, or In-System notifications).
- **Payments & Invoicing:** A third-party payment provider will be chosen at a later date, prioritizing a balance of high-quality service and affordable processing rates.

## 7. Testing Strategy
- **Backend:** **JUnit** will be utilized for all backend (Java) unit tests to ensure high test coverage and reliable business logic.
- **Frontend:** **Playwright** will be used for comprehensive frontend (React/TypeScript) testing, handling reliable end-to-end and component test scenarios.

## 8. Compliance & Data Privacy
- **Target Markets:** North America (United States and Canada).
- **Regulatory Standards:** The application will be engineered to strictly follow North American data privacy laws, including compliance with regional US privacy regulations (such as CCPA) and Canadian federal law (PIPEDA). This ensures maximum protection for the utility companies and their end-users.

## 9. Internationalization & Localization (i18n)
- **Multi-Language Support:** Specifically to serve the Canadian market, the application must natively support displaying text in multiple languages (English and French as a baseline).
- **Architecture:** Both frontend and backend systems will be built with robust i18n capabilities from the beginning to dynamically localize interface text, notifications, and user-facing communications.
