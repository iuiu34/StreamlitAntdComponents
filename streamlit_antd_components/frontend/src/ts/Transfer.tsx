import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {Button, ConfigProvider, Transfer} from 'antd';
import {ReloadOutlined} from '@ant-design/icons';
import type {TransferDirection, TransferListProps} from 'antd/es/transfer';
import {DarkenColor, GetColor, getTheme, insertStyle, RgbaColor} from "../js/utils.react"
import {numberToStr, strToNode} from "../js/transfer.react";
import '../css/transfer.css'
import {BaseProp, LabelWrap} from "./utils";

interface TransferProp extends BaseProp {
    label: any
    description: any
    items: any[]
    index: any
    titles: any
    search: boolean
    pagination: boolean
    oneway: boolean
    align: any
    reload: boolean | string
    disabled: boolean
    width: number
    height: number
    use_container_width: boolean
    return_index: boolean;
    kv: any;
}


const AntdTransfer = (props: TransferProp) => {
    //get data
    const theme = getTheme(props);
const colorPrimary = theme.colorPrimary;
const colorText = theme.colorText;
const fontSize = theme.fontSize;
const fontFamily=theme.fontFamily;
const colorBgContainer=theme.colorBgContainer;

    const label = props['label']
    const description = props['description']
    const items = strToNode(props['items'])
    const index = numberToStr(props['index'])
    const titles = props['titles']
    const search = props['search']
    const pagination = props['pagination']
    const oneway = props['oneway']
    const align = props['align']
    const reload = props['reload']
    const disabled = props['disabled']
    const width = props['width']
    const height = props['height']
    const grow = props['use_container_width']
    const return_index = props['return_index']
    const kv = props['kv']
    const secondaryBgColor = GetColor('--secondary-background-color')

    //data source
    const [dataSource, setDataSource] = useState(items)
    //target keys
    const [targetKeys, setTargetKeys] = useState(index);

    //callback
    const onChange = (nextTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
        setTargetKeys(nextTargetKeys);
        Streamlit.setComponentValue(nextTargetKeys.map((x) => return_index ? Number(x) : kv[Number(x)]));
    };
    const onSearch = (dir: TransferDirection, value: string) => {
        Streamlit.setComponentValue(targetKeys.map((x: any) => return_index ? Number(x) : kv[Number(x)]))
    };
    const reset = () => {
        setDataSource(items)
        setTargetKeys(index)
        Streamlit.setComponentValue(props['index'].map((x: any) => return_index ? x : kv[x]))
    }

    //footer
    const renderFooter = (
        _: TransferListProps<any>,
        info?: {
            direction: TransferDirection;
        },
    ) => {
        let float = info !== undefined ? info.direction : 'left'
        return (
            <ConfigProvider
                theme={{
                    token: {...theme}
                }}
            >
                <Button size="small" type={'primary'} style={{float: `${float}`, margin: 5}} onClick={reset}
                        icon={<ReloadOutlined/>}>
                    {typeof (reload) == 'boolean' ? 'Reload' : reload}
                </Button>
            </ConfigProvider>
        );
    };

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    let textStyle = `
    .ant-transfer-list-content-item-remove:hover{
        color: ${colorPrimary} !important;
    }
    `
    insertStyle('sac.transfer.style', textStyle)

    return (
        <ConfigProvider
            theme={{
                token: {...theme},
                components: {
                    Transfer: {
                        colorBgContainer: 'transform',
                        colorBorder: RgbaColor(colorText),
                        colorText: 'var(--text-color)',
                        colorTextDisabled: RgbaColor(colorText, 0.5),
                        controlItemBgHover: RgbaColor(colorText),
                        controlItemBgActive: 'transform',
                        controlItemBgActiveHover: 'transform',
                        fontFamily: 'var(--font)',
                    },
                    Button: {
                        colorPrimary: colorPrimary,
                        colorPrimaryHover: colorPrimary,
                        colorPrimaryActive: DarkenColor(colorPrimary, 0.1),
                        colorTextDisabled: RgbaColor(colorText, 0.5),
                        colorBgContainerDisabled: RgbaColor(colorText, 0.1),
                    },
                    Checkbox: {
                        colorPrimary: colorPrimary,
                        colorPrimaryActive: colorPrimary,
                        colorPrimaryHover: colorPrimary,
                        colorBgContainer: 'transform',
                        colorBorder: RgbaColor(colorText, 0.3),
                    },
                    Input: {
                        colorBgContainer: 'inherit',
                        colorBorder: RgbaColor(colorText),
                        colorPrimaryHover: colorPrimary,
                        activeBorderColor: colorPrimary,
                        controlOutlineWidth: 0,
                        colorTextPlaceholder: RgbaColor(colorText, 0.5),
                    },
                    Pagination: {
                        colorText: 'var(--text-color)',
                        colorBgContainer: 'inherit',
                        colorBorder: RgbaColor(colorText),
                        colorPrimary: colorPrimary,
                        colorPrimaryHover: colorPrimary,
                        controlOutlineWidth: 0,
                        colorTextDisabled: RgbaColor(colorText)
                    },
                    Dropdown: {
                        colorBgElevated: GetColor('--background-color'),
                        colorText: 'var(--text-color)',
                        controlItemBgHover: secondaryBgColor,
                        boxShadowSecondary: `0 0 10px ${secondaryBgColor}, 0 0 6px ${secondaryBgColor}`,
                    },
                    Empty: {
                        colorTextDisabled: RgbaColor(colorText, 0.3),
                    }
                },
            }}
        >
            <LabelWrap
                label={label}
                desc={description}
                align={align}
                grow={grow}
                style={{overflowX: 'auto'}}
                children={
                    <Transfer
                        dataSource={dataSource}
                        titles={titles}
                        targetKeys={targetKeys}
                        onChange={onChange}
                        onSearch={onSearch}
                        render={(item: any) => item.title}
                        showSearch={search}
                        showSelectAll={true}
                        pagination={pagination}
                        oneWay={oneway}
                        disabled={disabled}
                        listStyle={{
                            width: grow ? '100%' : width,
                            height: height,
                            minHeight: 200 + (search ? 60 : 0) + (reload ? 40 : 0)
                        }}
                        footer={typeof (reload) == 'string' || String(reload) === 'true' ? renderFooter : undefined}
                    />
                }
            />
        </ConfigProvider>
    );
};

export default AntdTransfer
