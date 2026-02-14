export enum AppRoute {
    AUTH = 'AUTH',
    INTERESTS = 'INTERESTS',
    FEED = 'FEED'
}

export interface UserState {
    name: string;
    email: string;
    photoUrl: string;
    isAuthenticated: boolean;
    interests: string[];
}
