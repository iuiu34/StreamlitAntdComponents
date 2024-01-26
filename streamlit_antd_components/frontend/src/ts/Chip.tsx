import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useRef, useState} from "react";
import {Chip, Group, Stack} from "@mantine/core";
import {DarkenColor, GetColor, getSize, getTheme, reindex, RgbaColor} from "../js/utils.react"
import strToNode from "../js/chip.react";
import {BaseProp, LabelWrap} from "./utils";

interface ChipProp extends BaseProp {
    label: any
    description: any
    items: any[]
    index: any
    align: string
    direction: string
    radius: any
    variant: string
    multiple: boolean
    return_index: boolean;
    kv: any;
    stValue: any
}

const AntdChip = (props: ChipProp) => {
    //get data
    const items = strToNode(props['items'])
    const index = reindex(props['index'], true, props['multiple'])
    const label = props['label']
    const description = props['description']
    const align = props['align']
    const direction = props['direction']
    const radius = props['radius']
    const variant = props['variant']
    const multiple = props['multiple']
    const return_index = props['return_index']
    const kv = props['kv']
    const secondaryBgColor = GetColor('--secondary-background-color')

    const theme = getTheme(props);
    const colorPrimary = theme.colorPrimary;
    const colorText = theme.colorText;
    const fontSize = theme.fontSize;
    const fontFamily = theme.fontFamily;
    const colorBgContainer = theme.colorBgContainer;

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    const Wrap = direction === 'vertical' ? Stack : Group

    //state
    const [value, setValue] = useState(index)

    //callback
    const onChange = (values: any) => {
        setValue(values)
        if (Array.isArray(values)) {
            Streamlit.setComponentValue(values.map((x: any) => return_index ? Number(x) : kv[Number(x)]))
        } else {
            Streamlit.setComponentValue(return_index ? Number(values) : kv[Number(values)])
        }
    }

    //listen index
    const prevIndex = useRef(props['index'])
    const prevStValue = useRef(props['stValue'])
    useEffect(() => {
        const i = props['index']
        const st_i = props['stValue']
        if (String(i) !== String(prevIndex.current)) {
            const ii = reindex(i, true, props['multiple'])
            setValue(ii);
            prevIndex.current = props['index']
            if (Array.isArray(ii)) {
                Streamlit.setComponentValue(ii.map((x: any) => return_index ? Number(x) : kv[Number(x)]))
            } else {
                Streamlit.setComponentValue(return_index ? Number(ii) : kv[Number(ii)])
            }
        }
        if (String(st_i) !== String(prevStValue.current)) {
            const st_ii = reindex(st_i, true, props['multiple'])
            setValue(st_ii);
            prevStValue.current = props['stValue']
            if (Array.isArray(st_ii)) {
                Streamlit.setComponentValue(st_ii.map((x: any) => return_index ? Number(x) : kv[Number(x)]))
            } else {
                Streamlit.setComponentValue(return_index ? Number(st_ii) : kv[Number(st_ii)])
            }
        }
    }, [props, kv, return_index])

    return <LabelWrap
        label={label}
        desc={description}
        fontSize={fontSize}
        align={align}
        children={
            <Chip.Group
                onChange={onChange}
                value={value}
                multiple={multiple}
            >
                <Wrap spacing={'xs'}>
                    {items.map((item: any, idx: any) =>
                        <Chip
                            key={idx}
                            value={item.value}
                            radius={radius}
                            size={fontSize}
                            variant={variant}
                            disabled={item.disabled}
                            styles={(theme) => ({
                                label: {
                                    height: getSize(fontSize) + 16,
                                    marginBottom: 0,
                                    color: colorText,
                                    borderColor:
                                        variant !== 'outline' ? 'transparent' : RgbaColor(colorText),
                                    backgroundColor: variant === 'outline' ? 'transparent' : secondaryBgColor,
                                    '&:hover': {
                                        backgroundColor:
                                            variant === 'outline' ? 'transparent' : DarkenColor(secondaryBgColor, 0.1),
                                        borderColor:
                                            variant === 'outline' ? colorPrimary : 'transparent',
                                    },
                                    '&[data-checked]:not([data-disabled])': {
                                        color:
                                            variant === 'light' ? colorPrimary : variant === 'filled' ? '#fff' : colorText
                                        ,
                                        backgroundColor:
                                            variant === 'light' ? RgbaColor(colorPrimary) :
                                                variant === 'filled' ? colorPrimary : 'transparent',
                                        borderColor:
                                            variant === 'outline' ? colorPrimary : 'transparent',
                                    },
                                    '&[data-checked]:not([data-disabled]):hover': {
                                        backgroundColor:
                                            variant === 'light' ? RgbaColor(colorPrimary, 0.3) :
                                                variant === 'filled' ? DarkenColor(colorPrimary, 0.1) : 'transparent',
                                    },
                                },
                                checkIcon: {
                                    color:
                                        variant === 'filled' ? '#fff' : colorPrimary
                                }
                            })}
                        >
                            {item.label}
                        </Chip>)}
                </Wrap>
            </Chip.Group>
        }
    />
};

export default AntdChip
