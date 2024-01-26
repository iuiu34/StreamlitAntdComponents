import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useRef, useState} from "react";
import type {PaginationProps} from 'antd';
import {ConfigProvider, Pagination} from 'antd';
import {getSize, getTheme, insertStyle, MartineRadiusSize, RgbaColor} from "../js/utils.react"
import '../css/pagination.css'
import {BaseProp} from "./utils";

interface PaginationProp extends BaseProp {
    total: any
    index: any
    page_size: any
    jump: any
    align: string
    circle: string
    radius: any
    variant: any
    previous: any
    next: any
    simple: boolean
    disabled: boolean
    show_total: boolean
    stValue: any
}

const AntdPagination = (props: PaginationProp) => {
    //get data
    const theme = getTheme(props);
const colorPrimary = theme.colorPrimary;
const colorText = theme.colorText;
const fontSize = theme.fontSize;
const fontFamily=theme.fontFamily;
const colorBgContainer=theme.colorBgContainer;

    const total = props['total'];
    const index = props['index'];
    const page_size = props['page_size'];
    const jump = props['jump'];
    const align = props['align'];
    const radius = props['radius'];
    const variant = props['variant'];
    const previous = props['previous'];
    const next = props['next'];
    const simple = props['simple'];
    const disabled = props['disabled'];
    const show_total = props['show_total'];
    const primaryLightColor = RgbaColor(colorPrimary)

    const [current, setCurrent] = useState(index);

    // component height
    useEffect(() => Streamlit.setFrameHeight())


    const textStyle = `
    .ant-pagination-item-active{
        border-color: ${variant === 'light' ? primaryLightColor : colorPrimary} !important
    }
    .ant-pagination-item-active a{
        color: ${variant === 'filled' ? '#fff' : colorPrimary} !important
    }
    .ant-pagination-options-quick-jumper input{
        border-radius: ${getSize(radius, MartineRadiusSize)}px;
        aspect-ratio: 2/1;
        width:auto !important
    }
    .ant-pagination-item-ellipsis{
        color:${RgbaColor(colorText)} !important
    }
    .ant-pagination-item-link[disabled]{
        color:${RgbaColor(colorText)} !important
    }
    .ant-pagination-item-link,.ant-pagination-item-link-icon{
        font-size:${getSize(fontSize)}px !important
    }
    `
    insertStyle(`sac.pagination.style`, textStyle)

    //callback
    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
        Streamlit.setComponentValue(page)
    }

    //listen index
    const prevIndex = useRef(props['index'])
    const prevStValue = useRef(props['stValue'])
    useEffect(() => {
        const i = props['index']
        const st_i = props['stValue']
        if (i !== prevIndex.current) {
            setCurrent(i);
            Streamlit.setComponentValue(i);
            prevIndex.current = props['index']
        }
        if (st_i !== prevStValue.current) {
            setCurrent(st_i);
            Streamlit.setComponentValue(st_i);
            prevStValue.current = props['stValue']
        }
    }, [props])

    //previous and next button
    const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
        if (type === 'prev' && previous !== null) {
            return <button className={'ant-pagination-item-link px-2'} style={{fontSize: getSize(fontSize)}}>
                {previous}
            </button>
        }
        if (type === 'next' && next !== null) {
            return <button className={'ant-pagination-item-link px-2'} style={{fontSize: getSize(fontSize)}}>
                {next}
            </button>
        }
        return originalElement;
    };

    return (
        <ConfigProvider
            theme={{
                token: {...theme},
                components: {
                    Pagination: {
                        itemActiveBg: variant === 'outline' ? 'transform' : variant === 'light' ? primaryLightColor : colorPrimary,
                        colorPrimaryHover: colorPrimary,
                        colorBgTextHover: RgbaColor(colorText),
                        colorBgTextActive: RgbaColor(colorText, 0.25),
                        borderRadius: getSize(radius, MartineRadiusSize),
                        controlOutlineWidth: 0,
                        colorBorder: RgbaColor(colorText, 0.3),
                        itemSize: 3 * getSize(fontSize) - 16,
                        controlHeight: 3 * getSize(fontSize) - 18,
                        colorTextDisabled: RgbaColor(colorText),
                        controlItemBgActiveDisabled: RgbaColor(colorText, 0.1),
                        colorBgContainerDisabled: RgbaColor(colorText, 0.1),
                    },
                },
            }}
        >
            <div className={`d-flex justify-content-${align}`}>
                <Pagination
                    current={current}
                    showQuickJumper={jump}
                    defaultCurrent={index}
                    defaultPageSize={page_size}
                    simple={simple}
                    disabled={disabled}
                    onChange={onChange}
                    total={total}
                    showTitle={false}
                    showSizeChanger={false}
                    itemRender={itemRender}
                    showTotal={show_total ? (t, r) => `${r[0]}-${r[1]} / ${t}` : undefined}
                />
            </div>
        </ConfigProvider>
    );
};

export default AntdPagination
