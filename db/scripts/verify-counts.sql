SELECT 'Redirect' AS tbl, COUNT(*)::text AS n FROM "Redirect"
UNION ALL SELECT 'Service', COUNT(*)::text FROM "Service"
UNION ALL SELECT 'BlogPost', COUNT(*)::text FROM "BlogPost"
UNION ALL SELECT 'Media', COUNT(*)::text FROM "Media"
UNION ALL SELECT 'SiteSettings', COUNT(*)::text FROM "SiteSettings"
UNION ALL SELECT 'AdminUser', COUNT(*)::text FROM "AdminUser"
UNION ALL SELECT 'Page', COUNT(*)::text FROM "Page";
