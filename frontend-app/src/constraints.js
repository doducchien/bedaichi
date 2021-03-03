//value
export const server = 'http://localhost:1999';
export const sexes = [
    {
        value: '0',
        label: 'Nam',
    },
    {
        value: '1',
        label: 'Nữ',
    },
    {
        value: '2',
        label: 'Khác',
    },
]

export const types = [
    {
        value: 'admin',
        label: 'admin',
    },
    {
        value: 'staff',
        label: 'staff',
    },
    {
        value: 'regime',
        label: 'regime',
    },
    {
        value: 'salary',
        label: 'salary',
    },
    {
        value: 'product',
        label: 'product',
    },
]

//functions
export const changeTimeToInt = (date)=>{
    const d = date.split('-')
    console.log(d[0], d[1], d[2])

    return new Date(d[0], d[1] - 1, d[2]).getTime();
}

export const changeIntToTime = (int)=>{
    const d = new Date()
    d.setTime(int)
    const mm = d.getMonth();
    const dd = d.getDate();
    const yyyy = d.getFullYear();

    const date = mm + '/' + dd + '/' + yyyy;
    return date;
    
}