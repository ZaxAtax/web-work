import styles from './inspire-bank-lib.module.scss';

/* eslint-disable-next-line */
export interface InspireBankLibProps {}

export function InspireBankLib(props: InspireBankLibProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to InspireBankLib!</h1>
    </div>
  );
}

export default InspireBankLib;
