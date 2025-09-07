import { filterBy } from '@progress/kendo-data-query';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import _, { isEmpty } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useMountedRef } from '@/share/common';
import { useUserContext } from '@/share/context/userContext';
import { withFilter, withValueField } from '@/share/hoc/select';

const Select_F_V = withFilter(withValueField(DropDownList));
const DL_V = withValueField(DropDownList);

const handleEmps = (p = [], infoNum = 5) => {
    const filter = (o) => {
        let infotext = `${o.EMP_ID}/${o.EMP_NAME}/${o.DEPT_NAME}`;

        if (infoNum >= 4) {
            infotext += `/ ${o.KIND_ID === '0' ? '主辦' : '兼職'} `;
        }

        if (infoNum >= 5) {
            infotext += `/ ${o.TITLE_NAME}`;
        }

        return infotext;
    };

    return p.map((v) =>
        _.assign(
            {
                id: v.EMP_ID,
                text: filter(v),
            },
            v
        )
    );
};

/**
 * valuefield: id
 * textfield: text
 *
 * @param {*} param0
 * @returns
 */
export const SelEmp = ({ initData = [], infoNum = 5, ...others }) => {
    const [empList, setEmpList] = useState(initData);

    const mount = useMountedRef();

    let common = useUserContext();

    const refresh = () => {
        if (mount.current) {
            setEmpList(handleEmps(common.users, infoNum));
        }
    };

    useEffect(() => {
        if (_.isEmpty(empList)) {
            refresh();
        }
    }, [initData]);

    return <Select_F_V allData={empList} minLen={3} {...others}></Select_F_V>;
};

const pageSize = 10;

/**
 * 有virtual 的下拉選單
 * 上面的改良版可以不會覺得因為資料多而很笨重
 * 不適合對應顯示資料，因為listitem是分批顯示所以一開始不會載入所有資料
 *
 * @param {object} Emps - 全部Users的資料
 * @returns
 */
export const SelEmpv2 = ({ allData = [], infoNum = 5, ...others }) => {
    let common = useUserContext();

    let allusers = isEmpty(allData) ? handleEmps(common.users, infoNum) : handleEmps(allData, infoNum);

    let filteredData = useRef(allusers.slice());

    const [state, setState] = useState({
        skip: 0,
        total: allusers.length,
        subsetData: allusers.slice(0, pageSize),
    });

    const onFilterChange = (event) => {
        filteredData.current = filterBy(allusers.slice(), event.filter);
        const data = filteredData.current.slice(0, pageSize);
        setState({
            subsetData: data,
            skip: 0,
            total: filteredData.current.length,
        });
    };

    const pageChange = (event) => {
        const skip = event.page.skip;
        const take = event.page.take;
        const newSubsetData = filteredData.current.slice(skip, skip + take);
        setState({
            subsetData: newSubsetData,
            skip: skip,
            total: filteredData.current.length,
        });
    };

    useEffect(() => {
        filteredData.current = allusers.slice();
        setState({
            skip: 0,
            total: allusers.length,
            subsetData: allusers.slice(0, pageSize),
        });
    }, [common.users]);

    return (
        <DL_V
            data={state.subsetData}
            virtual={{
                total: state.total,
                pageSize: pageSize,
                skip: state.skip,
            }}
            onPageChange={pageChange}
            popupSettings={{
                height: '250px',
            }}
            filterable={true}
            onFilterChange={onFilterChange}
            textField='text'
            valueField='id'
            {...others}
        ></DL_V>
    );
};
