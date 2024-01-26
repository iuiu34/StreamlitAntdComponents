import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {ConfigProvider, Rate} from 'antd';
import {getTheme, parseIcon, RgbaColor} from "../js/utils.react"
import {StarFilled} from '@ant-design/icons';
import {BaseProp, LabelWrap} from "./utils";

interface RateProp extends BaseProp {
    label: any
    description: any
    value: any
    count: any
    symbol: any
    align: string
    half: boolean
    stValue: any
}

const AntdRate = (props: RateProp) => {
    //get data
    const theme = getTheme(props);
const colorPrimary = theme.colorPrimary;
const colorText = theme.colorText;
const fontSize = theme.fontSize;
const fontFamily=theme.fontFamily;
const colorBgContainer=theme.colorBgContainer;

    const label = props['label'];
    const description = props['description'];
    const value = props['value'];
    const count = props['count'];
    const symbol = parseIcon(props['symbol']);
    const align = props['align'];
    const half = props['half'];
    const sizeMap: any = {'xs': 12, 'sm': 16, 'md': 20, 'lg': 30, 'xl': 50}

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    //callback
    const onChange = (value: number) => {
        Streamlit.setComponentValue(value)
    }

    return (
        <ConfigProvider
            theme={{
                token: {...theme},
                components: {
                    Rate: {
                        colorFillContent: RgbaColor(colorText, 0.2),
                    },
                },
            }}
        >
            <LabelWrap
                label={label}
                desc={description}
                align={align}
                fontSize={fontSize}
                children={
                    <Rate
                        defaultValue={value}
                        count={count}
                        character={symbol !== null ? symbol : <StarFilled/>}
                        allowHalf={half}
                        style={{fontSize: typeof (fontSize) == 'string' ? sizeMap[fontSize] : fontSize, color: colorPrimary}}
                        onChange={onChange}
                    />
                }
            />
        </ConfigProvider>
    );
};

export default AntdRate
