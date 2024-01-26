import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {ConfigProvider, QRCode} from 'antd';
import {getTheme} from "../js/utils.react"
import {BaseProp, LabelWrap} from "./utils";
import '../css/color_picker.css'


interface QRCodeProp extends BaseProp {
    label: any
    description: any
    value: any
}

const AntdQRCode = (props: QRCodeProp) => {
    //get data
    const theme = getTheme(props);
    const label = props['label']
    const description = props['description']
    const value = props['value']

    //state
    // const [value, setValue] = useState()

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    //callback
    // const onChange = (text: Color, hex: string) => {
    //     setColor(text)
    //     Streamlit.setComponentValue(text)
    // }

    return (
        <ConfigProvider
            theme={{
                token: {...theme}
            }}>
            <LabelWrap
                label={label}
                desc={description}
                grow={true}
                children={
                    <QRCode
                        value={value}
                        // color={colorPrimary}
                        // defaultValue={colorPrimary}
                        // onChange={onChange}
                        // onOpenChange={openChange}
                    />}/></ConfigProvider>)
};

export default AntdQRCode
