export const getHoursFormat = (passedDate?: Date) => {
    const date = passedDate || new Date();

    const hours = appendZero(date.getHours());
    const minutes = appendZero(date.getMinutes());
    const seconds = appendZero(date.getSeconds());

    return `${hours}:${minutes}:${seconds}`;
}

const appendZero = (input: number) => {
    return input < 10 ? `0${input}` : `${input}`;
}