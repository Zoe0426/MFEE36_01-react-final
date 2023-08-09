import style from './cartpostinfo.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faPhone,
  faUser,
  faEnvelope,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';
import { Checkbox, ConfigProvider } from 'antd';

export default function CartPostInfo({
  addressSid = '',
  storeName = '',
  address = '',
  name = '',
  mobile = '',
  email = '',
  postType,
  edit = true,
  forModal = false,
  defaultStatus = false,
  selectedAddSid = 0,
  checkDefaultAdd = () => {},
}) {
  //預計到貨日期
  function formatDateRange(startDate, endDate) {
    const options = { month: 'numeric', day: 'numeric' };
    const dateFormatter = new Intl.DateTimeFormat('zh-TW', options);

    const formattedStartDate = dateFormatter.format(startDate);
    const formattedEndDate = dateFormatter.format(endDate);

    return `${formattedStartDate} - ${formattedEndDate}`;
  }
  const today = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 2);

  const tenDaysLater = new Date();
  tenDaysLater.setDate(today.getDate() + 5);

  const dateRange = formatDateRange(threeDaysLater, tenDaysLater);
  //console.log(dateRange); // 6月8日 - 6月16日

  let img = '';
  if (postType === 1) {
    forModal
      ? (img = '/cart_img/c-blackcat2.png')
      : (img = '/cart_img/c-blackcat.jpeg');
  } else if (postType === 2) {
    img = '/cart_img/c-7Eleven.png';
  } else if (postType === 3) {
    forModal
      ? (img = '/cart_img/c-family2.png')
      : (img = '/cart_img/c-family.jpeg');
  }
  if (forModal === true) {
    return (
      <div
        className={
          selectedAddSid === addressSid
            ? `${style.modalBox2}`
            : `${style.modalBox}`
        }
      >
        <div className={style.details}>
          <p>
            <span className={style.icon}>
              <FontAwesomeIcon
                icon={faUser}
                style={{ maxWidth: '20px', maxHeight: '20px' }}
              />
            </span>
            <span>{name}&nbsp;&nbsp;&nbsp;&nbsp;</span>

            <span className={style.icon}>
              <FontAwesomeIcon
                icon={faPhone}
                style={{ maxWidth: '20px', maxHeight: '20px' }}
              />
            </span>
            <span>{mobile}</span>
            <span></span>
          </p>
          <p>
            <span className={style.icon}>
              <FontAwesomeIcon
                icon={faLocationDot}
                style={{
                  maxWidth: '20px',
                  maxHeight: '20px',
                }}
              />
            </span>

            <span>
              {address}&nbsp;&nbsp;&nbsp;{storeName}
            </span>
          </p>

          <p>
            <span className={style.icon}>
              <FontAwesomeIcon
                icon={faCalendarDays}
                style={{ maxWidth: '20px', maxHeight: '20px' }}
              />
            </span>
            預計到貨&nbsp;&nbsp;
            <span>{dateRange}</span>
          </p>
        </div>
      </div>
    );
  } else
    return (
      <div className={style.box}>
        <div className={style.details}>
          <p>
            <span className={style.icon}>
              <FontAwesomeIcon
                icon={faUser}
                style={{ maxWidth: '20px', maxHeight: '20px' }}
              />
            </span>
            <span>{name}&nbsp;&nbsp;&nbsp;&nbsp;</span>

            <span className={style.icon}>
              <FontAwesomeIcon
                icon={faPhone}
                style={{ maxWidth: '20px', maxHeight: '20px' }}
              />
            </span>
            <span>{mobile}</span>
          </p>

          <p>
            <span className={style.icon}>
              <FontAwesomeIcon
                icon={faLocationDot}
                style={{
                  maxWidth: '20px',
                  maxHeight: '20px',
                }}
              />
            </span>

            <span>
              {address}&nbsp;&nbsp;&nbsp;{storeName}
            </span>
          </p>
          <p>
            <span className={style.icon}>
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{ maxWidth: '20px', maxHeight: '20px' }}
              />
            </span>
            {email}
          </p>
          {edit && (
            <>
              <p>
                <span className={style.icon}>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    style={{ maxWidth: '20px', maxHeight: '20px' }}
                  />
                </span>
                預計到貨&nbsp;&nbsp;
                <span>{dateRange}</span>
              </p>
              <div className={style.defaultCheckbox}>
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: '#FD8C46',
                      fontSize: 18,
                    },
                  }}
                >
                  <Checkbox
                    onChange={() => {
                      checkDefaultAdd(addressSid, defaultStatus);
                    }}
                    checked={defaultStatus}
                  />
                </ConfigProvider>

                <span className={style.text}>預設地址</span>
              </div>
            </>
          )}
        </div>
        <div>
          <img src={img} alt="" className={style.postTypeImg} />
        </div>
      </div>
    );
}
