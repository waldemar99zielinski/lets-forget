export enum Path {
    root = '',
    offer = 'offer',
    profile = 'profile',
    map = 'map',
    mobileView = 'mobile',
    mobileUserMenu = 'user-menu'
}

const pathsStructure: Record<Path, Path | null> = {
    [Path.root]: null,
    [Path.offer]: null,
    [Path.profile]: null,
    [Path.map]: null,
    [Path.mobileView]: null,
    [Path.mobileUserMenu]: Path.mobileView,
};

export const getPath = (route: Path) => {
    let full_path = '';

    let current: Path | null = route;

    while (current) {
        full_path = `/${current}` + full_path;
        current = pathsStructure[current];
    }
    return full_path;
}