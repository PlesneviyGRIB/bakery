import styled from 'styled-components';
import { Property } from 'csstype';

export const FlexColumn = styled.div<{ gap?: Property.Gap }>`
    display: flex;
    flex-direction: column;
    gap: ${({ gap }) => gap || '1em'};
`;

export const FlexRow = styled.div<{ $gap?: Property.Gap; $justifyContent?: Property.JustifyContent }>`
    display: flex;
    gap: ${({ $gap }) => $gap || '1em'};
    justify-content: ${({ $justifyContent }) => $justifyContent};
`;

export const FlexGrow = styled.div`
    flex-grow: 1;
`;