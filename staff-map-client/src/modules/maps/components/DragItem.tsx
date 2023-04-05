import type { CSSProperties, FC } from 'react'
import { useDrag } from 'react-dnd'
import type { MapPlaceType } from './types';

export type DropItem = {
    name: string;
    type: MapPlaceType;
}

interface DropResult {
    name: string
}

const style: CSSProperties = {
    cursor: 'move',
    background: 'transparent',
}

interface DragItemProps {
    title: string;
    type: MapPlaceType;
    icon: string;
}

const DragItem: FC<DragItemProps> = ({ title, type, icon }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type,
        item: {
            name: type,
            type
        },
        end: (item, monitor) => {
console.log('DragItem end', item);

            const dropResult = monitor.getDropResult<DropResult>()
            if (item && dropResult) {
                console.log(`You dropped ${item.name} onto ${dropResult.name}!`)
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }))

    const opacity = isDragging ? 0.4 : 1;

    return <>
        <p>
            {
                title
            }
        </p>
        <img
            ref={drag}
            style={{ ...style, opacity }}
            data-pinid={`map-pin-${type}`}
            src={icon}
            alt={`${type} map pin`}
        />
    </>
}

export default DragItem
