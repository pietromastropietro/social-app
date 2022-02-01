export const getFormattedDate = (rawDate) => {
    // temp
    const date = new Date(rawDate);
    return `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}`;
}

// Get max date of birth users can set during registration (today's date minus 18 years)
export const getMaxDob = () => {
    const today = new Date();
    
    return new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate() + 1
    ).toISOString().substring(0, 10);
};