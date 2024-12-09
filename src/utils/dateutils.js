const getdate=(date)=>{
    var format = new Date(date);
    var dateformat = format.getDate();
    var monthformat = format.getMonth() + 1;
    var yearformat = format.getFullYear();
    var selectDate = dateformat + '/' + monthformat + '/' + yearformat;
    return selectDate;
}
export default getdate