import React from "react";

const Dashboard = React.lazy(() => import('./pages/Home'));
const Clients = React.lazy(() => import('./pages/Users/Clients'));
const Admins = React.lazy(() => import('./pages/Users/Admins'));
const Services = React.lazy(() => import('./pages/Services/Services'));
const Providers = React.lazy(() => import('./pages/Services/Providers'));
const CompanyInfo = React.lazy(() => import('./pages/Settings/CompanyInfo'));
const Cities = React.lazy(() => import('./pages/Settings/Cities'));
const Reasons = React.lazy(() => import('./pages/Settings/Reasons'));
const Privacy = React.lazy(() => import('./pages/Policies/Privacy'));
const Terms = React.lazy(() => import('./pages/Policies/Terms'));
const Orders = React.lazy(() => import('./pages/Orders/Orders'));

const routes = [
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/users/clients", name: "Clients", element: Clients },
  { path: "/users/admins", name: "Admins", element: Admins },
  { path: "/services", name: "Services", element: Services },
  { path: "/services/providers", name: "Services Providers", element: Providers },
  { path: "/settings/company_info", name: "Company Info", element: CompanyInfo },
  { path: "/settings/cities", name: "Cities", element: Cities },
  { path: "/settings/reasons", name: "Reasons", element: Reasons },
  { path: "/policies/privacy_policy", name: "Privacy Policy", element: Privacy },
  { path: "/policies/terms", name: "Terms", element: Terms },
  { path: "/orders", name: "Orders", element: Orders },
];

export default routes;
