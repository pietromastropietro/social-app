export const getFormattedDate = (rawDate) => {
    // temp
    const date = new Date(rawDate);
    return `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}`;
}

// Get max date of birth users can set during registration/profile edit (today's date minus 18 years)
export const getMaxDob = () => {
    let today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return getDateForInputElement(today);
};

// Get formatted date string suited for input html element's default value (ex: 2022-12-25)
export const getDateForInputElement = (date) => {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
    ).toISOString().substring(0, 10);
};