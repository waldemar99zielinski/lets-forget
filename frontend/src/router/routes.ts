export enum Path {
    root = '',
    offer = 'offer',
    profile = 'profile',
    map = 'map',
}

const pathsStructure: Record<Path, Path | null> = {
    [Path.root]: null,
    [Path.offer]: null,
    [Path.profile]: null,
    [Path.map]: null
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