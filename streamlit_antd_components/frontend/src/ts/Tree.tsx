import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import type {TreeProps} from 'antd/es/tree';
import {ConfigProvider, Tree} from 'antd';
import {CaretDownFilled} from '@ant-design/icons';
import {strToNode} from "../js/tree.react";
import {getCollapseKeys, getParentKeys, getSize, getTheme, insertStyle, reindex, RgbaColor} from "../js/utils.react"
import '../css/tree.css'
import {BaseProp, LabelWrap} from "./utils";

interface TreeProp extends BaseProp {
    label: any
    description: any
    items: any[]
    index: any
    icon: any
    align: any
    width: any
    height: any
    open_index: any
    open_all: boolean
    checkbox: boolean
    checkbox_strict: boolean
    show_line: boolean
    return_index: boolean;
    kv: any;
}

const AntdTree = (props: TreeProp) => {
    //get data
    const theme = getTheme(props);
    const fontSize = theme.fontSize
    const colorPrimary = theme.colorPrimary
    const colorText = theme.colorText
    const label = props['label']
    const description = props['description']
    const items = strToNode(props.items, fontSize, props.icon, RgbaColor(colorText, 0.5))
    const dsk = reindex(props.index, false)
    const openIndex = reindex(props.open_index, false)
    const openAll = props['open_all']
    const height = props['height']
    const width = props['width']
    const align = props['align']
    const checkable = props['checkbox']
    const checkStrictly = props['checkbox_strict']
    const showLine = props['show_line']
    const return_index = props['return_index']
    const kv = props['kv']
    const dok = openAll ? getCollapseKeys(items) : openIndex ? openIndex : dsk && getParentKeys(dsk, items)
    const primaryLightColor = RgbaColor(colorPrimary)

    //state
    const [value, setValue] = useState(dsk)

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    const textStyle = `
    span.ant-tree-node-content-wrapper.ant-tree-node-selected {
        color: ${colorPrimary};
    }
    .ant-tree-switcher-icon {
        font-size: ${getSize(fontSize) - 2}px !important;
    }
    .ant-tree-title{
        line-height:${getSize(fontSize) + 2}px !important
    }
    .ant-tree-checkbox-indeterminate .ant-tree-checkbox-inner:after{
        width:50% !important;
        height:50% !important;
    }
    `
    insertStyle(`sac.tree.style`, textStyle)

    //callback
    const onExpand: TreeProps['onExpand'] = (e) => {
        Streamlit.setComponentValue(value.map((x: any) => return_index ? x : kv[x]));
    };
    const onSelect: TreeProps['onSelect'] = (selectedKeys_, info) => {
        setValue(selectedKeys_)
        Streamlit.setComponentValue(checkable ?
            selectedKeys_.map((x: any) => return_index ? x : kv[x]) :
            return_index ? selectedKeys_[0] : kv[selectedKeys_[0]]);
    };
    const onCheck: TreeProps['onCheck'] = (checkedKeys_, info) => {
        let ck = (Array.isArray(checkedKeys_)) ? checkedKeys_ : checkedKeys_['checked']
        setValue(ck)
        Streamlit.setComponentValue(ck.map((x: any) => return_index ? x : kv[x]))
    }

    return (
        <ConfigProvider
            theme={{
                token: {...theme},
                components: {
                    Tree: {
                        colorPrimaryHover: colorPrimary,
                        colorBgContainer: 'transform',
                        colorTextDisabled: RgbaColor(colorText, 0.5),
                        controlItemBgHover: RgbaColor(colorText),
                        controlItemBgActive: primaryLightColor,
                        controlInteractiveSize: getSize(fontSize) + 2,
                        colorBorder: RgbaColor(colorText, 0.4),
                    },
                },
            }}
        >
            <LabelWrap
                label={label}
                desc={description}
                fontSize={fontSize}
                align={align}
                children={
                    <Tree
                        onSelect={onSelect}
                        onCheck={onCheck}
                        onExpand={onExpand}
                        selectedKeys={value}
                        checkedKeys={value}
                        defaultSelectedKeys={dsk}
                        defaultCheckedKeys={dsk}
                        defaultExpandedKeys={dok}
                        treeData={items}
                        showLine={showLine}
                        checkable={checkable}
                        selectable={!checkable}
                        height={height}
                        checkStrictly={checkStrictly}
                        switcherIcon={<CaretDownFilled/>}
                        blockNode={true}
                        virtual={false}
                        style={{
                            whiteSpace: 'nowrap', overflowX: 'auto', overflowY: 'hidden', width: width
                        }}
                    />
                }
            />
        </ConfigProvider>
    );
};

export default AntdTree
