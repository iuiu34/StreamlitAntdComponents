import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {ColorPicker, ConfigProvider} from 'antd';
import {getTheme} from "../js/utils.react"
import {BaseProp, LabelWrap} from "./utils";
import {Color} from "antd/es/color-picker";
import '../css/color_picker.css'


interface ColorPickerProp extends BaseProp {
    label: any
    description: any
}

const AntdColorPicker = (props: ColorPickerProp) => {
    //get data
    const theme = getTheme(props);
    const colorPrimary = theme.colorPrimary;
    const colorText = theme.colorText;
    const fontSize = theme.fontSize;
    const fontFamily = theme.fontFamily;
    const colorBgContainer = theme.colorBgContainer;
    const label = props['label']
    const description = props['description']
    const labelHeight = label !== null ? 64 : 32
    //state
    const [height, setHeight] = useState(labelHeight)
    const [color, setColor] = useState(colorPrimary);

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    //callback
    const onChange = (value: Color, hex: string) => {
        setColor(value)
        Streamlit.setComponentValue(hex)
    }

    const openChange = (open: boolean) => {
        let labelHeight = label !== null ? 64 : 32
        setHeight(open ? 270 + labelHeight : labelHeight)
    }

    return (
        <ConfigProvider
            theme={{
                token: {...theme},
            }}>
            <LabelWrap
                label={label}
                desc={description}
                grow={true}
                children={
                    <ColorPicker
                        onChange={onChange}
                        value={color}
                        defaultValue={colorPrimary}
                        // showText={label}
                        onOpenChange={openChange}
                    />}/></ConfigProvider>)
};

export default AntdColorPicker
