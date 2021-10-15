/* eslint-disable react/no-danger */

import React, { MouseEvent } from 'react';

import CloseIcon from '../../../../../public/icons/close.svg';

import styles from './FootnoteText.module.scss';

import Button, { ButtonSize, ButtonShape, ButtonType } from 'src/components/dls/Button/Button';
import Spinner from 'src/components/dls/Spinner/Spinner';

interface FootnoteTextProps {
  text: string;
  onCloseClicked: () => void;
  onTextClicked?: (event: MouseEvent, isSubFootnote?: boolean) => void;
  isLoading?: boolean;
}

const FootnoteText: React.FC<FootnoteTextProps> = ({
  text,
  onCloseClicked,
  onTextClicked,
  isLoading,
}) => (
  <div className={styles.footnoteContainer}>
    <div className={styles.header}>
      <p>Footnote</p>
      <Button
        size={ButtonSize.Small}
        shape={ButtonShape.Circle}
        type={ButtonType.Secondary}
        onClick={onCloseClicked}
      >
        <CloseIcon />
      </Button>
    </div>
    {isLoading ? (
      <Spinner />
    ) : (
      <div
        className={styles.footnote}
        dangerouslySetInnerHTML={{ __html: text }}
        {...(onTextClicked && { onClick: onTextClicked })}
      />
    )}
  </div>
);

export default FootnoteText;
