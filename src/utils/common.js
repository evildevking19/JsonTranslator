export const dateTime = (timestamp) => {
    const date = new Date(Number(timestamp));
    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return formattedDate;
};