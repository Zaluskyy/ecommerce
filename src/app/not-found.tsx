import React, {FC} from 'react'
import style from './NotFound.module.scss';

interface NotFoundProps{}

const NotFound: FC<NotFoundProps> = () => {

    return(
        <div className={style.NotFound}>
            Error 404, not found
        </div>
    )
}
export default NotFound