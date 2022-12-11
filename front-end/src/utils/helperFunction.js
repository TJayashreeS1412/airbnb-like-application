export const formatDate = (date) => {
    console.log(date)
    var formattedDate = new Date(date);
    console.log(formattedDate)

    return formattedDate.toLocaleDateString("en-US")
}