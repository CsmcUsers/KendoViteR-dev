import { DateInput, DateRangePicker } from '@progress/kendo-react-dateinputs';
import { Button } from '@progress/kendo-react-buttons';
import { xIcon } from '@progress/kendo-svg-icons';
import dayjs from 'dayjs';

const CustomStartDateInput = (props) => {
    const style = {
        color: props.value !== null ? 'green' : 'red',
    };

    return <DateInput {...props} label={undefined} />;
};

const CustomEndDateInput = (props) => {
    const style = {
        color: props.value !== null ? 'green' : 'red',
    };

    return <DateInput {...props} label={undefined} />;
};

export const CDRangePicker = (props) => {
    const { width, onChange, value, dateformat = 'yy-M-dd', onClear, showClear = false, ...others } = props;

    return (
        <div style={{ display: 'flex' }}>
            <DateRangePicker
                format={dateformat}
                onChange={(p) => {
                    p.value.start = p.value.start === null ? null : dayjs(p.value.start).toJSON();
                    p.value.end = p.value.end === null ? null : dayjs(p.value.end).toJSON();
                    onChange(p);
                }}
                value={{
                    start: value.start === null ? null : dayjs(value.start).toDate(),
                    end: value.end === null ? null : dayjs(value.end).toDate(),
                }}
                startDateInput={(p) => CustomStartDateInput({ ...p, width })}
                endDateInput={(p) => CustomEndDateInput({ ...p, width })}
                {...others}
            />
            {showClear && (
                <Button
                    size={'small'}
                    themeColor={'primary'}
                    style={{ marginLeft: '1px', marginRight: '1px' }}
                    svgIcon={xIcon}
                    onClick={onClear}
                    icon='delete'
                ></Button>
            )}
        </div>
    );
};
