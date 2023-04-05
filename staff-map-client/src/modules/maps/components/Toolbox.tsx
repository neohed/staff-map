import type { FC } from 'react'
import DragItem from './DragItem'
import staffMapPin from '../../../assets/map-pin.svg'
import officeMapPin from '../../../assets/crosshairs.svg'

export interface ToolboxProps {
    //name: string
}

const Toolbox: FC<ToolboxProps> = () => {
    return (
        <div className='toolbox'>
            <h1>
                Drag and drop pins:
            </h1>
            <DragItem title='Staff' type="Person" icon={staffMapPin} />
            <DragItem title='Office' type="Office" icon={officeMapPin} />
        </div>
    )
}

export default Toolbox;
