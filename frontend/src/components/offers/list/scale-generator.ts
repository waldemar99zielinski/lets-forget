export const generateScale = () => {
    const y = Math.random() > 0.5 ? -1 : 1;
    const x = Math.random() > 0.5 ? -1 : 1;

    return {x, y}
}