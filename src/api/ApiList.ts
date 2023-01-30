const ApiList = {
    checkAuth: '/admin/check',
    login: "/admin/auth/login",
    CilentsList: "/admin/users/view",
    BlockClient: "/admin/users/block",
    ActivateClients: "/admin/users/active",
    EditClients: "/admin/users/edit",
    AddClients: "/admin/users/create",
    AdminsList: "/admin/view",
    BlockAdmin: "/admin/block",
    activateAdmin: "/admin/active",
    getPermissions: "/admin/get_permissions",
    AddAdmin: "/admin/create",
    EditAdmin: "/admin/edit",
    getAdminPermissions: "/admin/get_admin_permissions",
    editUserPassword: "/admin/users/reset_password",
    editAdminPassword: "/admin/password",
    editAdminPermissions: "/admin/edit_permissions",
    getServices: "/admin/services/view",
    activateService: "/admin/services/activate",
    editService: "/admin/services/edit",
    getProviders: "/admin/providers/view",
    activateProviders: "/admin/providers/activate",
    deleteProviders: "/admin/providers/delete",
    getAllServices: "/admin/providers/services",
    editProviders: "/admin/providers/edit",
    getCompanyInfo: "/admin/settings/company/view",
    editCompanyInfo: "/admin/settings/company/edit",
    getCities: "/admin/settings/city/view",
    activateCities: "/admin/settings/city/activate",
    editCities: "/admin/settings/city/edit",
    getReasons: "/admin/settings/reason/view",
    getTerms: "/admin/conditions/term/view",
    createTerms: "/admin/conditions/term/create",
    getPolicy: "/admin/conditions/policy/view",
    editPolicy: "/admin/conditions/policy/edit",
    deleteTerms: "/admin/conditions/term/delete",
    editTerms: "/admin/conditions/term/edit",
    changeLang: "/admin/auth/lang/change",
    addProviders: "/admin/providers/create",
    addCity: "/admin/settings/city/create",
    activateReasons: "/admin/settings/reason/activate",
    editReasons: "/admin/settings/reason/edit",
    addReasons: "/admin/settings/reason/create",
    getOrders: "/admin/orders/view",
    createOrder: "/admin/orders/create",
    viewOrder: "/orders/order",
    editOrder: "/admin/orders/edit",
    getOrderServices: "/admin/orders/services",
    getOrderUsers: "/admin/orders/users",
    getOrderProviders: "/admin/orders/providers",
    getOrderCities: "/admin/orders/cities",
    changeOrderStatus: "/admin/orders/change",
    deleteOrder: "/admin/orders/delete",
    getStats: "/admin/statistics/home",
    getLastOrders: "/admin/statistics/last_orders",
    getNotifications: "/admin/notifications/view",
    addNotifications: "/admin/notifications/create",
    getNotifyUsers: "/admin/notifications/users",
    getUsersreport: "/admin/users/view",
    getOrdersreport: "/admin/orders/view",
    getProvidersReport: "/admin/providers/view"
}

export default ApiList