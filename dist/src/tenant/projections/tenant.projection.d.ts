export declare const TENANT_PUBLIC_SELECT: {
    readonly id_tenant: true;
    readonly name: true;
    readonly customDomain: true;
    readonly id_theme: true;
};
export declare const TENANT_WITH_USERS_SELECT: {
    readonly users: {
        readonly select: {
            readonly id_user: true;
            readonly email: true;
            readonly fullName: true;
            readonly role: true;
            readonly id_tenant: true;
        };
    };
    readonly id_tenant: true;
    readonly name: true;
    readonly customDomain: true;
    readonly id_theme: true;
};
