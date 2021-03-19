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
export const changeTimeToInt = (date) => {
    if(date){
        const d = date.split('-')
        return new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2])).getTime();
    }
    return null
    


}

export const changeIntToTime = (int) => {
    const d = new Date()
    d.setTime(int)
    const mm = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
    const dd = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
    const yyyy = d.getFullYear();

    const date = dd + '-' + mm + '-' + yyyy;
    return date;

}

export const randomID = () => {
    let id = '';
    for (let i = 0; i < 10; i++) {
        id += `${Math.floor(Math.random() * 10)}`
    }
    return id;
}