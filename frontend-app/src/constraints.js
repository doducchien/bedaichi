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
    return new Date(d[2], d[0] - 1, d[1]).getTime();
}