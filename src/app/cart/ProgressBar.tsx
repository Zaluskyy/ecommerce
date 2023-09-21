import React, {FC} from 'react';
import style from './style/ProgressBar.module.scss';
import Image from 'next/image';

import verifiedIcon from '../../../public/img/icon/verified.svg'

interface ProgressBarProps{
    currentProgress: number,
    setCurrentProgress: React.Dispatch<React.SetStateAction<number>>;
}

const ProgressBar: FC<ProgressBarProps> = ({currentProgress, setCurrentProgress}) => {

    const texts = ['Cart', 'Delivery & Payment', 'Summary', 'Done']
    const container = [];

    const handleClick = (i: number)=>{
        if(i<currentProgress){
            setCurrentProgress(i)
        }
    }

    const getClassName = (i: number)=>{
        if(currentProgress==(i+1)) return style.current
        else if(currentProgress>i) return style.past
    }

    for (let i=0; i<4; i++){
        container.push(
            <div key={texts[i]} onClick={()=>handleClick(i+1)} 
            className={`${getClassName(i)} ${style.numberContainer}`}
            >
                <div>{getClassName(i)==style.past?<Image src={verifiedIcon} alt="verified icon"/>:i+1}</div>
                <span>{texts[i]}</span>
            </div>
        )
        if(i!==3){
            container.push(<div key={i} className={style.line}/>)
        }
    }
    

    return ( 
        <div className={style.ProgressBar}>
            {container}
        </div>
     );
}
 
export default ProgressBar;