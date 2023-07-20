import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { BoxProps } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

import { useClickOutside } from 'src/hooks/useClickOutside';

import { ToolbarItem, ToolbarItemProps } from './ToolbarItem';

const DropDownContainer = styled.div`
    position: relative;
`;

const DropDownContent = styled.div<{isOpen: boolean}>`
    position: absolute;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    transition: transform 0.3s ease-out;
    transform: ${props => props.isOpen ? 'scaleY(1)' : 'scaleY(0)'};
    transform-origin: top center;
`;

interface ToolbarItem {
    icon: JSX.Element;
    props?: ToolbarItemProps;
}

interface ToolbarProps {
    containerProps?: BoxProps;
    items: ToolbarItem[];
    items_in_dropdown?: ToolbarItem[]; 
}

export const Toolbar = (props: ToolbarProps) => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const ref = useClickOutside(() => setIsDropDownOpen(false));

    return <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: 1,
            ...props.containerProps
        }}
    >
        {props.items.map((element, index) => <ToolbarItem key={index} size='small' {...element.props}>
            {element.icon}
        </ToolbarItem>)}
        {props.items_in_dropdown &&
            <DropDownContainer ref={ref}>
                 <ToolbarItem size='small' onClick={() => setIsDropDownOpen(state => !state)}>
                    {isDropDownOpen && <ExpandLessIcon /> || <ExpandMoreIcon />}
                </ToolbarItem>
                <DropDownContent isOpen={isDropDownOpen}>
                    {props.items_in_dropdown.map((element, index) => <ToolbarItem key={index} size='small' {...element.props}>
                        {element.icon}
                    </ToolbarItem>)}
                </DropDownContent>
            </DropDownContainer> 
           
        }
    </Box>;
}