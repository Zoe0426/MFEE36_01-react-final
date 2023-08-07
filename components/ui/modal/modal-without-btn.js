import Styles from './modal-without-btn.module.css';
import Image from 'next/image';
export default function ModalWithoutBtn({
  text = '中間文字',
  text2 = '',
  img = '',
  classTitle,
}) {
  return (
    <>
      <div className={Styles.modal}>
        <div className={Styles.modal_card}>
          <div className={Styles.box}>
            <Image src={img} width={70} height={70} alt="rightImg" />
            <div
              className={`${Styles.modal_content} ${
                classTitle === 'active' ? Styles.active : ''
              }`}
            >
              {text}
            </div>
            <div className={Styles.modal_content2}>{text2}</div>
            <Image src={img} width={70} height={70} alt="leftImg" />
          </div>
        </div>
      </div>
    </>
  );
}
