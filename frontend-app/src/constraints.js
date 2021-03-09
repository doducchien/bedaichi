import { TimelineItem } from '@material-ui/lab';
import axios from 'axios'

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

export const statusWork = [
    {
        value: '0',
        label: 'Đang làm việc'
    },

    {
        value: '1',
        label: 'Đã nghỉ việc'
    }
]

export const position = [
    {
        value: 'manager',
        label: 'GIÁM ĐỐC'
    },

    {
        value: 'secretary',
        label: 'THƯ KÝ'
    },

    {
        value: 'accountant',
        label: 'KẾ TOÁN'
    },

    {
        value: 'sale',
        label: 'SALE'
    },

    {
        value: 'marketing',
        label: 'TIẾP THỊ'
    },

    {
        value: 'design',
        label: 'THIẾT KẾ'
    },

    {
        value: 'print',
        label: 'IN ẤN'
    },
    {
        value: 'machine',
        label: 'GIA CÔNG'
    },
    {
        value: 'printFile',
        label: 'Xử lý in file'
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