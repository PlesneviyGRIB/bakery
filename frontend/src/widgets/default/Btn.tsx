import React, {ButtonHTMLAttributes, CSSProperties, PropsWithChildren, useMemo} from 'react';
import styled from "styled-components";

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    primary?: boolean;
    secondary?: boolean;
    danger?: boolean;
    info?: boolean;
    light?: boolean;
    dark?: boolean;
    link?: boolean;
    outline?: boolean;
    success?: boolean;
    warning?: boolean;
    style?: CSSProperties
}

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;

  svg[coloring = 'true'] {
    path {
      fill: currentColor;
      stroke: currentColor;
    }
  }

  svg[coloring = 'fill'] {
    path {
      fill: currentColor;
    }
  }

  svg[coloring = 'stroke'] {
    path {
      stroke: currentColor;
    }
  }
`

export const Btn = React.forwardRef<HTMLButtonElement, PropsWithChildren<BtnProps>>(({
                                                                                         primary,
                                                                                         warning,
                                                                                         secondary,
                                                                                         success,
                                                                                         danger,
                                                                                         info,
                                                                                         light,
                                                                                         dark,
                                                                                         link,
                                                                                         outline,
                                                                                         style,
                                                                                         children,
                                                                                         ...other
                                                                                     }, ref) => {
    const classNames = useMemo(
        () => ['btn']
            .concat(primary ? 'btn-primary' : '')
            .concat(secondary ? 'btn-secondary' : '')
            .concat(danger ? 'btn-danger' : '')
            .concat(success ? 'btn-success' : '')
            .concat(warning ? 'btn-warning' : '')
            .concat(info ? 'btn-info' : '')
            .concat(light ? 'btn-light' : '')
            .concat(dark ? 'btn-dark' : '')
            .concat(link ? 'btn-link' : '')
            .filter(c => !!c)
            .map(c => {
                if (outline && c.includes('-')) {
                    const arr = c.split('-')
                    return [arr[0], 'outline', arr[1]].join('-')
                }
                return c;
            }).join(' '),
        [primary, secondary, danger, success, outline, warning, info, light, dark, link]
    );

    return (
        <Button ref={ref} className={classNames} style={style} {...other}>
            {children}
        </Button>
    );
});