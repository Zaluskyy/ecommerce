import React, {FC} from 'react';
import style from './style/DeliveryAndPayment.module.scss';

interface SummaryProps{}

const Summary: FC<SummaryProps> = () => {

    return(
        <div className={style.Summary}>
            summary
        </div>
    )
}

export default Summary