export const convertNumToDate = (currentDate) => {
    let num = currentDate * 1000;
    let formatLocal = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: '2-digit' });
    let date = new Date(num);
    let updateDay = formatLocal.format(date)
    let updateTime = date.toTimeString().split(' ')[0];
    const dateString = currentDate > 0 ? updateDay + ' ' + updateTime : '-'
    return dateString;
}