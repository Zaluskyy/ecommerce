import React, {FC} from 'react';
import style from './style/Done.module.scss';

interface DoneProps{}

const Done: FC<DoneProps> = () => {

    return(
        <div className={style.Done}>
            done
        </div>
    )
}

export default Done