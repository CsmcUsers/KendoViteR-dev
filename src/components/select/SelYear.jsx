import { Button } from '@progress/kendo-react-buttons';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { xIcon } from '@progress/kendo-svg-icons';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

let year_start = 2020;
let year_now = dayjs().year();

let arryears = [];
let arrsim_years = [];

for (let i = 0; i < year_now - year_start + 2; i++) {
    arryears.push((year_start + i).toString());
    arrsim_years.push((109 + i).toString());
}

export const SelYear = ({ width = '100px', onChange, value, allowclear = false, category = 1, ...otherporps }) => {
    const [years, setYears] = useState([]);

    useEffect(() => {
        if (category === 1) {
            setYears(arryears);
        } else {
            setYears(arrsim_years);
        }
    }, [category]);

    return (
        <>
            <DropDownList
                style={{ width: width }}
                data={years}
                value={value}
                size={'small'}
                onChange={onChange}
                {...otherporps}
            ></DropDownList>
            {allowclear && (
                <Button
                    size={'small'}
                    style={{ marginLeft: '5px' }}
                    onClick={() => {
                        onChange(null);
                    }}
                    svgIcon={xIcon}
                ></Button>
            )}
        </>
    );
};
