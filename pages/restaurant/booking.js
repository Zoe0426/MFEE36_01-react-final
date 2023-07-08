import React from 'react';
import Styles from './booking.module.css';
import IconBtn from '@/components/ui/buttons/IconBtn';
import {
  faHeart,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function RestBooking() {
  return (
    <>
      <div className={Styles.abc}>
        <div className="container-inner">
          <div className={Styles.bgc}>
            <div className="breadcrumb">餐廳列表/我們家有農場</div>
            <IconBtn icon={faHeart} text="收藏列表" />
          </div>
        </div>
      </div>

      <div className="container-inner">
        <div className={Styles.booking_title}>
          <h1 className={Styles.timetable}>我們的家休閒農場預約時間表</h1>
          {/* <div className={Styles.hint_group}>
            <div className={Styles.hint}>
              <div className={Styles.can_book_square}></div>
              <p>可預約</p>
            </div>
            <div className={Styles.hint}>
              <div className={Styles.almost_full_square}></div>
              <p>即將額滿</p>
            </div>
            <div className={Styles.hint}>
              <div className={Styles.cannot_book_square}></div>
              <p>額滿</p>
            </div>
            <div className={Styles.hint}>
              <div className={Styles.rest_square}></div>
              <p>公休</p>
            </div>
          </div> */}
        </div>
        <div className={Styles.week}>
          <div className={Styles.lastweek}>
            <FontAwesomeIcon icon={faArrowLeft} className={Styles.arrow} />
            <p className={Styles.jill_p}>上一週</p>
          </div>
          <div className={Styles.nextweek}>
            <p className={Styles.jill_p}>下一週</p>
            <FontAwesomeIcon icon={faArrowRight} className={Styles.arrow} />
          </div>
        </div>
      </div>

      <div className="container-inner">
        <div className={Styles.time_group}>
          <div className={Styles.monday}>
            <div className={Styles.date}>7/10 (一)</div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>10:00~12:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>12:00~14:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>14:00~16:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>16:00~18:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>18:00~20:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>20:00~22:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
          </div>
          <div className={Styles.tuesday}>
            <div className={Styles.date}>7/11 (二)</div>

            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>10:00~12:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>12:00~14:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>14:00~16:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>16:00~18:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>18:00~20:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>20:00~22:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
          </div>
          <div className={Styles.tuesday}>
            <div className={Styles.date}>7/12 (三)</div>

            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>10:00~12:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>12:00~14:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>14:00~16:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>16:00~18:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>18:00~20:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>20:00~22:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
          </div>
          <div className={Styles.tuesday}>
            <div className={Styles.date}>7/13 (四)</div>

            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>10:00~12:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>12:00~14:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>14:00~16:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>16:00~18:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>18:00~20:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>20:00~22:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
          </div>
          <div className={Styles.tuesday}>
            <div className={Styles.date}>7/14 (五)</div>

            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>10:00~12:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>12:00~14:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>14:00~16:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>16:00~18:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>18:00~20:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>20:00~22:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
          </div>
          <div className={Styles.tuesday}>
            <div className={Styles.date}>7/15 (六)</div>

            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>10:00~12:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>12:00~14:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>14:00~16:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>16:00~18:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>18:00~20:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>20:00~22:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
          </div>
          <div className={Styles.tuesday}>
            <div className={Styles.date}>7/16 (日)</div>

            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>10:00~12:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>12:00~14:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>14:00~16:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>16:00~18:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>18:00~20:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>20:00~22:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
