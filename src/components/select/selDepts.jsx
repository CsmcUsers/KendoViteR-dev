import { DropDownList, MultiSelect } from '@progress/kendo-react-dropdowns';
import { assign, chain, find, isEmpty } from 'lodash';
import { cloneElement, useEffect, useState } from 'react';
import { useUserContext } from '@/share/context';
import { withFilter, withValueField } from '@/share/hoc/select';
import { colorDL } from '@/share/setting';

const SelDept_V_F = withFilter(withValueField(DropDownList));

/**
 * 所有部門下拉選單
 * @param {*} param0
 * @returns
 */
export const DLDepts = ({ initData = [], ...others }) => {
    const [depts, setdeptsList] = useState(initData);

    useEffect(() => {
        let data = initData.map((p) => assign({ id: p.DEPT_ID, text: `${p.DEPT_ID} / ${p.DEPT_NAME}` }, p));
        setdeptsList(data);
    }, [initData]);

    return <SelDept_V_F textField='text' valueField='id' allData={depts} minLen={2} {...others} />;
};

/**
 * 多選部門下拉選單
 * @param {} param0
 * @returns
 */
export const MDLDepts = ({ initData = [], value, maxSize, width, onChange, ...others }) => {
    const common = useUserContext();

    const allDepts = common.depts.map((p) => assign({ id: p.DEPT_ID, text: `${p.DEPT_ID} / ${p.DEPT_NAME}` }, p));

    const handleChange = (event) => {
        const values = event.target.value;
        const lastItem = values[values.length - 1];
        if (lastItem) {
            values.pop();
            const sameItem = values.find((value) => value === lastItem);
            if (sameItem === undefined) {
                values.push(lastItem);
            }
        }

        let outterval = chain(values)
            .map((p) => p.DEPT_ID)
            .join('_')
            .value();

        onChange({ ...event, value: outterval });
    };

    const itemRender = (li, itemProps) => {
        const index = itemProps.index;
        const item = itemProps.dataItem;
        const itemChildren = [
            <span
                key={index}
                style={{
                    color: colorDL.one,
                }}
            >
                {item.DEPT_ID}
            </span>,
            <span>{'/'}</span>,
            <span
                key={index + 100}
                style={{
                    color: colorDL.two,
                }}
            >
                {item.DEPT_NAME}
            </span>,
        ];
        return cloneElement(li, li.props, itemChildren);
    };

    const tagRender = (tagData, li) => {
        return cloneElement(li, li.props, [
            <span key={0} className='custom-tag' style={{ color: colorDL.two, fontSize: 16 }}>
                {tagData.text}
            </span>,
            li.props.children,
        ]);
    };

    let alonChange = maxSize
        ? (event) => {
              if (event.value.length > maxSize) {
                  return;
              } else {
                  handleChange(event);
              }
          }
        : onChange;

    let innerVal = isEmpty(value) ? null : value?.split('_').map((p) => find(allDepts, ['DEPT_ID', p]));

    return (
        <div>
            <MultiSelect
                textField='text'
                data={allDepts}
                // style={{ width: width }}
                itemRender={itemRender}
                tagRender={tagRender}
                onChange={alonChange}
                value={innerVal}
                placeholder={'請選擇...'}
                {...others}
            />
            {/* {maxSize && (
                <Hint
                    // id='hindId'
                    direction={'start'}
                    style={{
                        fontSize: '14px',
                        position: 'absolute',
                        right: 10,
                    }}
                >
                    最多選{maxSize}個部門 {innerVal?.length || 0} / {maxSize}
                </Hint>
            )} */}
        </div>
    );
};
