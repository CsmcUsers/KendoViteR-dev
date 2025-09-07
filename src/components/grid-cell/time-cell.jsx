import dayjs from 'dayjs';

export const TimeCell = (props) => {
    const { dataItem, field, format = 'YY-MM-DD' } = props;

    let showval = dataItem?.[field] === null ? '' : dayjs(dataItem?.[field]).format(format);
    return <td title={showval}>{showval}</td>;
};
