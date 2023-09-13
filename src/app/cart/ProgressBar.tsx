import React, {FC} from 'react';
import style from './style/ProgressBar.module.scss';

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

    for (let i=0; i<4; i++){
        container.push(
            <div key={texts[i]} onClick={()=>handleClick(i+1)} className={currentProgress==(i+1)?`${style.numberContainer} ${style.current}` : style.numberContainer}>
                <div>{i+1}</div>
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