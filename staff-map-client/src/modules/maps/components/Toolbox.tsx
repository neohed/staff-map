import React from 'react';
import type { CSSProperties, FC } from 'react'
import { useDrag } from 'react-dnd'

import { PlaceTypes } from './types'

export interface ToolboxProps {
    //name: string
}

interface DropResult {
    name: string
}

const style: CSSProperties = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
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

    const opacity = isDragging ? 0.4 : 1
    return (
        <div>
            <div ref={drag} style={{ ...style, opacity }} data-testid={`dave-box`}>
                {name}
            </div>
        </div>
    );
};

export default Toolbox;