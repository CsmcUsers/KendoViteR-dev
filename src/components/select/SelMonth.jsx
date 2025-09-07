import { DropDownList } from '@progress/kendo-react-dropdowns';
import dayjs from 'dayjs';

const generateMonth = () => {
    const months = [];
    const dateStart = dayjs();
    const dateEnd = dayjs().add(12, 'month');

    while (dateEnd.diff(dateStart, 'months') > 0) {
        months.push(dateStart.format('M').padStart(2, '0'));
        dateStart.add(1, 'month');
    }

    return months.sort();
};

export const SelMonth = (props) => {
    const { width = '100px', onChange = (f) => f, ...otherporps } = props;

    const handleChange = (p) => {
        onChange(p);
    };

    return (
        <DropDownList
            style={{ width: width }}
            label={'月份'}
            data={generateMonth()}
            onChange={handleChange}
            {...otherporps}
        />
    );
};
