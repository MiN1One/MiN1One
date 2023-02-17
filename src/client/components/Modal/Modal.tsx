import classNames from "classnames";
import { FC, memo, } from "react";
import { IoCloseOutline } from "react-icons/io5";
import classes from './Modal.module.scss';

interface ModalProps {
  open?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = (props) => {
  const { open = true, onClose, children, } = props;

  const modalClasses = classNames(
    classes.modal,
    { [classes.active]: open }
  );

  return (
    <div className={modalClasses}>
      <div className={classes.content}>
        {children}
      </div>
      <button 
        onClick={onClose} 
        className="btn-control btn-control-group btn-control-group--top"
      >
        <IoCloseOutline stroke="var(--color-grey-light)" />
      </button>
    </div>
  );
};

export default memo(Modal)