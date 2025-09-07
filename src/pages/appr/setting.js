export const getApprItems = (yyy, period = '01') => {
    /**
     * 經營績效欄位
     * 113 量
     */
    let performanceItem = [];

    /**
     * 113利
     */
    let sec2 = [];

    /**
     * 管理績效欄位
     * 113 質
     */
    let manageItem = [];

    let sec4 = [];

    //不顯示在試算的項目
    let officialItems = [];

    switch (yyy) {
        case '111':
            performanceItem = ['Appr01', 'Appr02', 'Appr03', 'Appr04', 'Appr05', 'Appr13', 'Appr14'];
            manageItem = ['Appr06', 'Appr07', 'Appr10', 'Appr09'];
            if (period === '04') {
                manageItem = [...manageItem, 'Appr08'];
            }
            officialItems = manageItem;
            break;
        case '112':
            performanceItem = ['Appr01', 'Appr02', 'Appr03', 'Appr04', 'Appr05', 'Appr13'];
            manageItem = ['Appr06', 'Appr07', 'Appr10', 'Appr20', 'Appr09'];
            if (period === '04') {
                manageItem = [...manageItem, 'Appr08'];
            }
            officialItems = manageItem;
            break;

        case '113':
            performanceItem = ['Appr01', 'Appr02', 'Appr03', 'Appr04', 'Appr05'];

            sec2 = ['Appr13', 'Appr21'];

            if (period === '01' || period === '03') {
                manageItem = ['Appr22'];
            } else {
                manageItem = ['Appr07', 'Appr22', 'Appr06', 'Appr24'];
                sec4 = ['Appr23'];
            }

            if (period === '04') {
                manageItem = ['Appr08', ...manageItem];
            }

            officialItems = ['Appr07', 'Appr06', 'Appr24', 'Appr23'];
            break;

        case '114':
            performanceItem = ['Appr01', 'Appr25', 'Appr03', 'Appr04', 'Appr26'];

            sec2 = ['Appr13', 'Appr21'];

            if (period === '01' || period === '03') {
                manageItem = ['Appr22'];
            } else {
                manageItem = ['Appr07', 'Appr22', 'Appr06', 'Appr24'];
                sec4 = ['Appr23'];
            }

            if (period === '04') {
                manageItem = ['Appr08', ...manageItem];
            }

            officialItems = ['Appr07', 'Appr06', 'Appr24', 'Appr23'];
            break;

        default:
            performanceItem = ['Appr01', 'Appr25', 'Appr03', 'Appr04', 'Appr26'];

            sec2 = ['Appr13', 'Appr21'];

            if (period === '01' || period === '03') {
                manageItem = ['Appr22'];
            } else {
                manageItem = ['Appr07', 'Appr22', 'Appr06', 'Appr24'];
                sec4 = ['Appr23'];
            }

            if (period === '04') {
                manageItem = ['Appr08', ...manageItem];
            }

            officialItems = ['Appr07', 'Appr06', 'Appr24', 'Appr23'];
            break;
    }

    return { performanceItem, sec2, manageItem, sec4, officialItems };
};
