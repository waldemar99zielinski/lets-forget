export enum Path {
    root = '',
    offer = 'offer',
    profile = 'profile',
    map = 'map',
    mobileView = 'mobile',
    mobileUserMenu = 'user-menu',
    auth = 'auth',
    signIn = 'signin',
    signUp = 'signup',
    signOut = 'signout',
    activate = 'activate'
}

const pathsStructure: Record<Path, Path | null> = {
    [Path.root]: null,
    [Path.offer]: null,
    [Path.profile]: null,
    [Path.map]: null,
    [Path.mobileView]: null,
        [Path.mobileUserMenu]: Path.mobileView,
    [Path.auth]: null,
        [Path.signIn]: Path.auth,
        [Path.signUp]: Path.auth,
        [Path.signOut]: Path.auth,
        [Path.activate]: Path.auth
};

export const getPath = (route: Path, params?: string) => {
    let full_path = '';

    let current: Path | null = route;

    while (current) {
        full_path = `/${current}` + full_path;
        current = pathsStructure[current];
    }

    if(params)
        full_path = full_path + params;

    if(!full_path)
        return '/';

    return full_path;
}