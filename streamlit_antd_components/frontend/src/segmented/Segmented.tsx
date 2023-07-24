import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {Segmented, ConfigProvider} from 'antd';
import {AlphaColor} from "../utils.react";
import {strToNode} from "./segmented.react";
import "./segmented.css"

interface SegmentedProp {
    items: any[];
    index: number | string;
    size: "large" | "middle" | "small";
    align: any;
    disabled: boolean;
    grow: boolean;
    key: string | undefined;
}

const AntdSegmented = (props: SegmentedProp) => {
    //get data
    const items = strToNode(props['items'])
    const index = props['index']
    const size = props['size']
    const align = props['align']
    const disabled = props['disabled']
    const grow = props['grow']
    const key = props['key']

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    //callback
    const onChange = (idx: any) => {
        Streamlit.setComponentValue(idx)
    }
    const wrapSegmented = (x: boolean) => {
        if (x) {
            return <Segmented
                key={key}
                options={items}
                defaultValue={index}
                disabled={disabled}
                size={size}
                onChange={onChange}
                block={grow}
            >
            </Segmented>
        } else {
            return <div className={`d-flex justify-content-${align}`}>
                <Segmented
                    key={key}
                    options={items}
                    defaultValue={index}
                    disabled={disabled}
                    size={size}
                    onChange={onChange}
                >
                </Segmented>
            </div>
        }
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Segmented: {
                        itemColor: 'var(--text-color)',
                        itemHoverBg: AlphaColor('--text-color', 0.2),
                        itemHoverColor: 'var(--primary-color)',
                        itemSelectedBg: AlphaColor(),
                        itemActiveBg: AlphaColor(),
                        colorBgLayout: 'var(--secondary-background-color)',
                        colorTextDisabled: AlphaColor('--text-color', 0.2),
                        controlHeight: 36,
                        controlHeightSM: 28,
                        controlHeightLG: 42,
                        fontSize: 16,
                        fontSizeSM: 14,
                        fontSizeLG: 18,
                        borderRadiusSM: 6,
                        borderRadius: 6,
                    },
                },
            }}
        >
            {wrapSegmented(grow)}
        </ConfigProvider>
    );
};

export default AntdSegmented