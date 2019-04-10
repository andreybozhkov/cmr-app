CMR requests tracking and automation for a freight forwarding company.

This is a Single Page Application (SPA) built with ReactJS library and Kinvey back-end.

Major application sections are navigated to mostly using the navbar at the top of the page and rendered using React Router Library.

Public Part:
- Application start page
- Sign-Up page - special note: admin priviliges for the moment must be granted on the back-end. Admin creation can be added at later stage.
- Log-In page

Private (User) Part (protected with custom private routes):
- Shipments:
    - Shipments list
    - Shipment details
        - Possibility to edit and delete. All users can edit. Only admins can delete. User role (all users vs admin) is enforced on front-end with array of roles and on back-end.
    - Shipment creation. All users can create shipments.
- Hauliers:
    - Hauliers list
    - Haulier details
        - Possibility to edit and delete. All users can edit. Only admins can delete. User role (all users vs admin) is enforced on front-end with array of roles and on back-end.
    - Haulier creation. All users can create hauliers.
- Reminders (querying, filtering and "manual" population applied to get desired results):
    - List of hauliers and the nr of missing documents respectively.
    - Detailed list of missing documents per haulier.
    - Send e-mail with reminders (connect with Microsoft Graph API).

Administrator Part:
- Ability to delete shipments and hauliers.

Made for JS Web module, ReactJS Fundamentals course at SoftUni.

SoftUni username: andreybozhkov