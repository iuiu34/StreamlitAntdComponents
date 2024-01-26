import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {Divider} from '@mantine/core';
import {getTheme, markdown, RgbaColor} from "../js/utils.react"
import {BaseProp, CustomIcon} from "./utils";
import {ConfigProvider} from "antd";

interface DividerProp extends BaseProp {
    label: any
    icon: any
    align: any
    variant: any
}

const AntdDivider = (props: DividerProp) => {
    //get data
    const label = props['label'];
    const icon = props['icon'];
    // @ts-ignore
    const align = {'start': 'left', 'center': 'center', 'end': 'right'}[props['align']]
    const variant = props['variant'];
    const theme = getTheme(props);
    const colorPrimary = theme.colorPrimary;
    const colorText = theme.colorText;
    const fontSize = theme.fontSize;
    const fontFamily = theme.fontFamily;
    const colorBgContainer = theme.colorBgContainer;

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    return (
        <ConfigProvider
            theme={{
                token: {...theme},
            }}>
            <Divider
                // color={color == null ? RgbaColor(colorText) : color}
                label={icon ?
                    <span className={'d-flex align-items-center'}>
                    <CustomIcon icon={icon} style={{marginRight: 5}}/>{markdown(label)}
                </span> : markdown(label)}
                labelPosition={align}
                // fontSize={fontSize}
                variant={variant}
            />
        </ConfigProvider>

    );
};

export default AntdDivider
