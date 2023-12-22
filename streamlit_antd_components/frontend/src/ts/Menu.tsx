import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useRef, useState} from "react";
import type {MenuProps} from 'antd';
import {ConfigProvider, Menu} from 'antd';
import {useMantineTheme} from "@mantine/core";
import {strToNode} from "../js/menu.react";
import {
    AlphaColor, getCollapseKeys, getHrefKeys, getParentKeys, reindex, StreamlitScrollbar, MartineFontSize, insertStyle
} from "../js/utils.react"
import '../css/menu.css'

interface MenuProp {
    items: any[];
    index: any;
    open_index: any;
    open_all: boolean;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    color: any
    variant: any
    indent: any;
    return_index: boolean;
    kv: any;
    stValue: any
}


const AntdMenu = (props: MenuProp) => {
    //get data
    const items = strToNode(props.items, props.size, props.variant)
    const dsk = reindex(props.index)
    const openIndex = reindex(props.open_index)
    const openAll = props['open_all']
    const size = props['size']
    const color = props['color']
    const variant = props['variant']
    const indent = props['indent']
    const return_index = props['return_index']
    const kv = props['kv']
    const dok = openAll ? getCollapseKeys(items) : openIndex ? openIndex : dsk && getParentKeys(dsk, items)
    const theme = useMantineTheme()
    const primaryColor = color == null ? 'var(--primary-color)' : theme.colors[color][6]
    const primaryLightColor = color == null ? AlphaColor() : theme.colors[color][1]

    //custom style
    StreamlitScrollbar()
    if (variant === 'filled') {
        let textStyle = `
        li.ant-menu-item-selected .sac-menu-description{
            color: ${theme.fn.darken('#fff', 0.1)} !important
        }
        .ant-menu-submenu-selected > .ant-menu-submenu-title{
            color:${primaryColor} !important
        }
    `
        insertStyle(`sac.menu.filled`, textStyle)
    }

    //state
    const [selectKey, setSelectKey] = useState(dsk)

    //component height
    useEffect(() => Streamlit.setFrameHeight())

    //listen index
    const prevIndex = useRef(props['index'])
    const prevStValue = useRef(props['stValue'])
    useEffect(() => {
        const i = props['index']
        const st_i = props['stValue']
        if (i !== prevIndex.current) {
            setSelectKey(reindex(i));
            Streamlit.setComponentValue(return_index ? i : kv[i]);
            prevIndex.current = props['index']
        }
        if (st_i !== prevStValue.current) {
            setSelectKey(reindex(st_i));
            Streamlit.setComponentValue(return_index ? st_i : kv[st_i]);
            prevStValue.current = props['stValue']
        }
    }, [props, kv, return_index])


    //callback
    const onSelect: MenuProps['onSelect'] = (e) => {
        //only not href item will fire
        let hrefKeys = getHrefKeys(items)
        if (hrefKeys.indexOf(e.key) === -1) {
            setSelectKey([e.key]);
            Streamlit.setComponentValue(return_index ? Number(e.key) : kv[Number(e.key)]);
        }
    }
    const onOpenChange: MenuProps['onOpenChange'] = (e) => {
        const stValue = return_index ? Number(selectKey[0]) : kv[Number(selectKey[0])]
        //set time to rerender
        setTimeout(() => Streamlit.setComponentValue(stValue), 200)
    }

    // antd menu component
    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        itemBorderRadius: 8,
                        itemColor: 'var(--text-color)',
                        groupTitleColor: AlphaColor('--text-color', 0.5),
                        itemDisabledColor: AlphaColor('--text-color', 0.5),
                        itemHoverColor: 'var(--text-color)',
                        itemHoverBg: AlphaColor('--text-color', 0.1),
                        itemActiveBg: AlphaColor('--text-color', 0.2),
                        itemSelectedColor: variant === 'filled' ? '#fff' : primaryColor,
                        itemSelectedBg: variant === 'light' ? primaryLightColor : variant === 'filled' ? primaryColor : 'transform',
                        subMenuItemBg: 'transform',
                        itemBg: 'transform',
                        colorSplit: AlphaColor('--text-color', 0.2),
                        fontFamily: 'var(--font)',
                        iconMarginInlineEnd: 10,
                        fontSize: MartineFontSize[size],
                        itemHeight: MartineFontSize[size] + 20,
                        iconSize: MartineFontSize[size] + 3,
                    },
                },
            }}
        >
            <Menu
                onSelect={onSelect}
                onOpenChange={onOpenChange}
                selectedKeys={selectKey}
                style={{borderRightWidth: 0}}
                defaultSelectedKeys={dsk}
                defaultOpenKeys={dok}
                mode={'inline'}
                items={items}
                inlineIndent={indent}
                className={'text-wrap text-break'}
                subMenuCloseDelay={0}
            />
        </ConfigProvider>
    );
};

export default AntdMenu
