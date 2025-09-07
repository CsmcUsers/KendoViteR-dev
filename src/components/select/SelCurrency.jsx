import { DropDownList } from '@progress/kendo-react-dropdowns';

const currency = [
    'TWD',
    'USD',
    'HKD',
    'GBP',
    'AUD',
    'SGD',
    'CHF',
    'CAD',
    'JPY',
    'SEK',
    'EUR',
    'NZD',
    'THB',
    'ZAR',
    'CNY',
];

export const SelCurrency = (props) => <DropDownList data={currency} {...props}></DropDownList>;
