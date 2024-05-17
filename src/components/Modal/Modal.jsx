import styles from './Modal.module.css'

const Modal = ({ photo, handleClose }) => {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalImage} style={{backgroundImage: `url(${photo})`}} alt="Listing Picture"></div>
      <button className={styles.close} onClick={() => handleClose()}>Close</button>
    </div>
  )
}

export default Modal