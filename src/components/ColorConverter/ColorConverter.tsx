import * as React from 'react';
import tinycolor from 'tinycolor2';
import {cn} from 'utils/classname';

import './ColorConverter.scss';

const block = cn('color-converter');

const DEFAULT_BACKGROUND_COLOR = '#f9f9f9';

export function ColorConverter() {
    const [hex, setHex] = React.useState('');
    const [rgb, setRgb] = React.useState<string>('');
    const [error, setError] = React.useState(false);

    const handleChangeHex = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
        if (value.length > 7) {
            return;
        }
        if (value.length === 1 && value && value !== '#') {
            setHex('#' + value);
        } else {
            setHex(value);
        }

        if (isCompleteHexValue(value)) {
            const color = tinycolor(value);
            setRgb(color.toRgbString());
            if (!color.isValid()) {
                setError(true);
            }
        } else if (rgb) {
            setRgb('');
            setError(false);
        }
    };

    const completed = isCompleteHexValue(hex);

    return (
        <div className={block()} style={{backgroundColor: getBackgroundColor(hex, completed, error)}}>
            <input className={block('input')} type="text" name="hex" value={hex} onChange={handleChangeHex} />
            <input
                className={block('input')}
                type="text"
                disabled
                name="rgb"
                value={error ? 'Ошибка!' : rgb}
                style={{color: tinycolor(rgb).isDark() ? '#fff' : '#000'}}
            />
        </div>
    );
}

function getBackgroundColor(hex: string, completed: boolean, error: boolean) {
    if (error) {
        return '#f00';
    } else if (completed) {
        return hex;
    } else {
        return DEFAULT_BACKGROUND_COLOR;
    }
}

function isCompleteHexValue(hex: string) {
    return hex.length === 4 || hex.length === 7;
}
