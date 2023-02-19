export const formatDate = (date: Date) => {
    return `${date.getDay().toString().padStart(2, '0')}-${date.getMonth().toString().padStart(2, '0')}-${date.getFullYear().toString()}`
}