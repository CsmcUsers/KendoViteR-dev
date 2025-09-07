import { DatePicker, DateTimePicker } from '@progress/kendo-react-dateinputs';
import _ from 'lodash';
import dayjs from 'dayjs';

/**
 * .startOf('day')
 * 移除時間
 * @param {*} param0
 * @returns
 */
export const DPicker = ({ onChange = (f) => f, value, ...others }) => {
    return (
        <DatePicker
            size={'small'}
            value={_.isNull(value) ? null : dayjs(value).toDate()}
            onChange={(p) => {
                let isValid = dayjs(p.value).isValid();

                if (!isValid) {
                    onChange({ ...p, value: null });
                    return;
                }

                onChange({ ...p, value: dayjs(p.value).format('YYYY-MM-DD') });
            }}
            format='yyyy-MM-dd'
            {...others}
        />
    );
};

export const DTPicker = ({ value, onChange, ...others }) => {
    return (
        <div>
            <DateTimePicker
                size='small'
                format={'yyyy-MM-dd HH:mm:ss'}
                value={_.isNull(value) ? null : dayjs(value).toDate()}
                onChange={(p) => {
                    let isValid = dayjs(p.value).isValid();

                    if (!isValid) {
                        onChange(null);
                        return;
                    }
                    onChange(dayjs(p.value).format());
                }}
                {...others}
            />
        </div>
    );
};
