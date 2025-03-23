import filterData from '@/data/product/filterData.json';
import orderbyOptions from '@/data/product/orderbyOptions.json';

const BASE_URL = process.env.WEB || 'http://localhost:3000';

const initialTableDataState = {
  totalRows: 0,
  perPage: 16,
  totalPages: 0,
  page: 1,
  rows: [],
};

const initialBreadcrumbState = [
  {
    id: 'shop',
    text: '商城',
    href: `${BASE_URL}/product`,
    show: true,
  },
  { id: 'search', text: '> 商品列表', href: '', show: true },
  { id: 'pid', text: '', href: '', show: false },
];

const initialPriceInputState = [
  { key: 'minPrice', value: 0, placeholder: '$ 最小金額', errorMessage: '' },
  { key: 'maxPrice', value: 0, placeholder: '$ 最大金額', errorMessage: '' },
];

const initialCheckboxGroups = [
  { label: '適用對象', name: 'typeForPet', isNeedSpan: true },
  { label: '使用年齡', name: 'typeForAge', isNeedSpan: true },
  { label: '商品類別', name: 'category', isNeedSpan: true },
];

export {
  filterData,
  orderbyOptions,
  initialTableDataState,
  initialBreadcrumbState,
  initialPriceInputState,
  initialCheckboxGroups,
};
