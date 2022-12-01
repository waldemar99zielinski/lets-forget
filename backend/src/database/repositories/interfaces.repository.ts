export interface FindByQuery<Entiy> {
    exactMatch?: ExactMatch<Entiy>;
    inMatch?: InMatch<Entiy>;
    textSearch?: TextSearch<Entiy>;
}

type ExactMatch<Entity> = {
    [key in keyof Entity]: Entity[key];
}

type InMatch<Entity> = {
    [key in keyof Entity]: Entity[key];
}

type TextSearch<Entity> = {
    [key in keyof Entity]: string;
}