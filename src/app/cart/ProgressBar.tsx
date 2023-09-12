import React, {FC} from 'react';
import style from './style/ProgressBar.module.scss';

interface ProgressBarProps{
    currentProgress: number
}

const ProgressBar: FC<ProgressBarProps> = ({currentProgress = 1}) => {

    const texts = ['Cart', 'Delivery & Payment', 'Summary', 'Done']
    const container = [];

    for (let i=0; i<4; i++){
        container.push(
            <div className={currentProgress==(i+1)?`${style.numberContainer} ${style.current}` : style.numberContainer}>
                <div>{i+1}</div>
                <span>{texts[i]}</span>
            </div>
        )
        if(i!==3){
            container.push(<div className={style.line}/>)
        }
    }
    
    console.log(container)

    return ( 
        <div className={style.ProgressBar}>
            {container}
        </div>
     );
}
 
export default ProgressBar;