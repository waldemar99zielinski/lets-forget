interface User {
    id: string;
    email: string;
    username: string;
    authStrategy: 'local' | 'google';
    defaultCity: string | null;
}