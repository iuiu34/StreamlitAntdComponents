import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {ColorPicker, ColorPickerProps, ConfigProvider} from 'antd';
import {getTheme} from "../js/utils.react"
import {Color} from "antd/es/color-picker";
import '../css/color_picker.css'


const AntdColorPicker = (props: ColorPickerProps) => {
    //get data
    // const theme = getTheme(props);
    const labelHeight = 20
    //state
    const [height, setHeight] = useState(labelHeight)
    const [value, setColor] = useState(props.value);

    // component height
    useEffect(() => Streamlit.setFrameHeight(height))

    //callback
    const onChange = (value: Color, hex: string) => {
        setColor(value)
        Streamlit.setComponentValue(hex)
    }

    const openChange = (open: boolean) => {
        setHeight(open ? 270 + labelHeight : labelHeight)
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    ColorPicker: {
                        // ...theme,
                    }
                }
            }}>
            <ColorPicker
                onChange={onChange}
                value={value}
                defaultValue={props.defaultValue}
                onOpenChange={openChange}
            /></ConfigProvider>)
};

export default AntdColorPicker
