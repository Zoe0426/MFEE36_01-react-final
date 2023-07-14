import React from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAnglesLeft,
  faAngleRight,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';

export default function PaginationTry() {
  const router = useRouter();
  return (
    <>
      <ul className={styles.pages}>
        <li
          className={
            datas.page > 1
              ? styles.page
              : `${styles.page} ${styles.page_disabled}`
          }
        >
          <Link
            href={
              datas.page > 1
                ? `?${new URLSearchParams({
                    ...router.query,
                    page: 1,
                  }).toString()}`
                : ''
            }
          >
            <FontAwesomeIcon
              icon={faAnglesLeft}
              className={datas.page > 1 ? '' : styles.icon_disable}
            />
          </Link>
        </li>

        <li
          className={
            datas.page > 1
              ? styles.page
              : `${styles.page} ${styles.page_disabled}`
          }
        >
          <Link
            href={
              datas.page > 1
                ? `?${new URLSearchParams({
                    ...router.query,
                    page: page - 1,
                  }).toString()}`
                : ''
            }
          >
            <FontAwesomeIcon
              icon={faAngleLeft}
              className={datas.page > 1 ? '' : styles.icon_disable}
            />
          </Link>
        </li>
        {Array(5)
          .fill(1)
          .map((v, i) => {
            const p = datas.page - 2 + i;
            if (p < 1 || p > datas.totalPages) return;
            return (
              <li
                className={
                  p === datas.page
                    ? `${styles.page} ${styles.page_active}`
                    : styles.page
                }
                key={p}
              >
                <Link
                  href={`?${new URLSearchParams({
                    ...router.query,
                    page: p,
                  }).toString()}`}
                >
                  {p}
                </Link>
              </li>
            );
          })}

        <li
          className={
            datas.page >= datas.totalPages
              ? `${styles.page} ${styles.page_disabled}`
              : styles.page
          }
        >
          <Link
            href={
              datas.page >= datas.totalPages
                ? ''
                : `?${new URLSearchParams({
                    ...router.query,
                    page: page + 1,
                  }).toString()}`
            }
          >
            <FontAwesomeIcon
              icon={faAngleRight}
              className={
                datas.page >= datas.totalPages ? styles.icon_disable : ''
              }
            />
          </Link>
        </li>

        <li
          className={
            datas.page >= datas.totalPages
              ? `${styles.page} ${styles.page_disabled}`
              : styles.page
          }
        >
          <Link
            href={
              datas.page >= datas.totalPages
                ? ''
                : `?${new URLSearchParams({
                    ...router.query,
                    page: datas.totalPages,
                  }).toString()}`
            }
          >
            <FontAwesomeIcon
              icon={faAnglesRight}
              className={
                datas.page >= datas.totalPages ? styles.icon_disable : ''
              }
            />
          </Link>
        </li>
      </ul>
    </>
  );
}
