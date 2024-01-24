import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {ConfigProvider, QRCode} from 'antd';
import {getTheme} from "../js/utils.react"
import {BaseProp, LabelWrap} from "./utils";
import {Color} from "antd/es/color-picker";
import '../css/color_picker.css'


interface QRCodeProp extends BaseProp {
    label: any
    description: any
    value: any
}

const AntdQRCode = (props: QRCodeProp) => {
    //get data
    const {backgroundColor, size, primaryColor, textColor, theme} = getTheme(props);
    const label = props['label']
    const description = props['description']
    const value = props['value']
    // const labelHeight = label !== null ? 64*5 : 32*5

    //state
    // const [height, setHeight] = useState()
    // const [color, setColor] = useState(props.color);

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    //callback
    // const onChange = (text: Color, hex: string) => {
    //     setColor(text)
    //     Streamlit.setComponentValue(text)
    // }

    // const openChange = (open: boolean) => {
    //     let labelHeight = label !== null ? 64 : 32
    //     setHeight(open ? 270 + labelHeight : labelHeight)
    // }

    return (
        <ConfigProvider
            theme={{
                components: {
                    QRCode: {
                        ...theme,
                    }
                }
            }}>
            <LabelWrap
                label={label}
                desc={description}
                grow={true}
                children={
                    <QRCode
                        value={value}
                        color={primaryColor}
                        // defaultValue={primaryColor}
                        // onChange={onChange}
                        // onOpenChange={openChange}
                    />}/></ConfigProvider>)
};

export default AntdQRCode
