export const formatDate = (date) => {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("en-US")
}