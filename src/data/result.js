export const _resultVal = { 判決: 0, 支付命令: 1, 本票裁定: 2, 債權憑證: 3 };

export const _result = [
    { id: _resultVal.判決, text: '判決' },
    { id: _resultVal.支付命令, text: '支付命令' },
    { id: _resultVal.本票裁定, text: '本票裁定' },
    { id: _resultVal.債權憑證, text: '債權憑證' },
];

//--------------------------------notes------------------------------//

export const _logintype = [
    { id: '0', text: '無' },
    { id: '1', text: 'OP執行JOB' },
    { id: '2', text: '最高權限' },
    { id: '3', text: '資管員(需要填管制人員)' },
    { id: '4', text: '最高權限、資管員(需要填管制人員)' },
];

export const _dependon = [
    { id: '0', text: '無' },
    { id: 'r', text: '資訊業務需求申請單' },
    { id: 'd', text: '來文' },
    { id: 's', text: '簽' },
    { id: 'q', text: '問題管理' },
    { id: 'o', text: '其他' },
];

export const _dependon1 = [
    { id: 'r', text: '電子' },
    { id: 'd', text: '紙本' },
    { id: 's', text: '無' },
];

//--------------------------------notes------------------------------//

export const _casetype = [
    { id: '0', text: '授信' },
    { id: '1', text: '催收' },
    { id: '2', text: '人事' },
    { id: '3', text: '存匯' },
    { id: '4', text: '理財業務' },
    { id: '5', text: '行政管理' },
    { id: '6', text: '業務合作' },
    { id: '7', text: '廣告贊助' },
    { id: '8', text: '營運' },
    { id: '9', text: '其他' },
];

export const _casestatus = [
    { id: 0, text: '草稿' },
    { id: 1, text: '處理中' },
    { id: 99, text: '結案' },
];

export const _poli_titles = ['董事長', '總經理', '經理', '副總經理', '處長', '副總經理', '主任秘書'];

export const _sys_modules = [
    { id: 'Appr', text: '營業單位考核', modulepath: 'appr' },
    { id: 'Bak', text: '後台', modulepath: 'backend' },
    { id: 'Cmr', text: '合約管理模組', modulepath: 'cmr' },
    { id: 'Debt', text: '擔保提存模組', modulepath: 'debt' },
    { id: 'Poli', text: '公關事務', modulepath: 'politics' },
    { id: 'Flow', text: '流程模組', modulepath: 'flow' },
    { id: 'Notes', text: 'Notes替代系統', modulepath: 'notes' },
    { id: 'Train', text: '自動化服務教育訓練', modulepath: 'train' },
    { id: 'Esg', text: 'ESG專區', modulepath: 'esg' },
    { id: 'Ep', text: '赤道原則專區', modulepath: 'ep' },
    { id: 'HL', text: '首購房貸資料填報', modulepath: 'hl' },
    { id: 'Tool', text: '小工具', modulepath: 'tools' },
    { id: 'Card', text: '信用卡模組', modulepath: 'card' },
    { id: 'Test', text: '測試模組', modulepath: 'test' },
    { id: 'Bonus', text: '獎金模組', modulepath: 'bonus' },
];

//不需要設定權限的頁面(大小寫都可以)
export const _commonpage = [
    'Flow01',
    'Flow02',
    'Flow03',
    'Flow04',
    'Esg',
    'Esg01',
    'Esg02',
    'Esg04',
    'Esg05',
    'Ep',
    'Ep01',
    'Ep02',
    'Ep99',
    'Train',
    'Train01',
    'Train_main',
    'Train_sec',
];

//--------------------------------通用------------------------------//
export const _common_choice_YN = { 是: 'Y', 否: 'N' };
export const _common_choice_NY = { 否: 'N', 是: 'Y' };
export const _common_choice_YNX = { 是: 'Y', 否: 'N', 不適用: 'X' };
export const _common_choice_YW = { 有: 'Y', 無: 'N' };
export const _common_choice_WY = { 無: 'N', 有: 'Y' };
//--------------------------------通用------------------------------//

//排除要提顯得但辦事項
export const _common_ignore_notify = ['Ins01', 'Ins02', 'Ins03'];
