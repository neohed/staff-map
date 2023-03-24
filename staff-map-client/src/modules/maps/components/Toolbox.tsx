import React from 'react';
import type { CSSProperties, FC } from 'react'
import { useDrag } from 'react-dnd'
import { PlaceTypes } from './types'
import mapPin from '../../../assets/map-pin.svg'

export interface ToolboxProps {
    //name: string
}

interface DropResult {
    name: string
}

const style: CSSProperties = {
    cursor: 'move',
    background: 'transparent',
}

const name = 'Dummy Name';

const Toolbox: FC<ToolboxProps> = () => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: PlaceTypes.Office,
        item: { name },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult<DropResult>()
            if (item && dropResult) {
                console.log(`You dropped ${item.name} into ${dropResult.name}!`)
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }))

    const opacity = isDragging ? 0.4 : 1;

    return (
        <div className='toolbox'>
            <p>
                Drag and drop pins:
            </p>
            <img
                ref={drag}
                style={{ ...style, opacity }}
                data-testid={`map-pin`}
                src={mapPin}
                alt="Map pin"
            />
        </div>
    );
};

export default Toolbox;