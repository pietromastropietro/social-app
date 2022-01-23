export const getFormattedDate = (rawDate) => {
    // temp
    const date = new Date(rawDate);
    return `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}`;
}