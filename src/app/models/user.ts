export interface Roles{
    editor?: boolean;
    admin?: boolean;
}
export interface UserInterface {
    // editor: boolean;
    // admin: boolean;
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    photoUrl?: string;
    roles?: Roles;
    
}