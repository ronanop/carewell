TRUNCATE "SiteSettings" CASCADE;
\copy "AdminUser" FROM 'export-csv/AdminUser.csv' WITH (FORMAT csv, HEADER true)
\copy "Page" FROM 'export-csv/Page.csv' WITH (FORMAT csv, HEADER true)
\copy "FormSubmission" FROM 'export-csv/FormSubmission.csv' WITH (FORMAT csv, HEADER true)
\copy "SiteSettings" FROM 'export-csv/SiteSettings.csv' WITH (FORMAT csv, HEADER true)
