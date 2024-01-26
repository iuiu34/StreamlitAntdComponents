#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/6/7 10:23
@Author   : iuiu
@File     : cascader.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""

from typing import List, Union

import streamlit as st

from streamlit_antd_components.utils import MantineSize, MantineFont, MantineColor
from streamlit_antd_components.utils.component_func import parse_theme


def markdown(
        body: str = None,
        # description: str = None,
        # value: str = None,
        # on_change: Callable = None,
        # args: Tuple[Any, ...] = None,
        # kwargs: Dict[str, Any] = None,
        # key=None,
        color: Union[MantineColor, str] = None,
        background_color: Union[MantineColor, str] = None,
        size: Union[MantineSize, int] = None,
        font: Union[MantineFont, str] = None,

) -> List[Union[str, int]]:
    """ant design color-picker  https://ant.design/components/color-picker

    :param on_change: item change callback
    :param args: callback args
    :param kwargs: callback kwargs
    :param key: component unique identifier
    :param color: alert color,support 'success', 'info', 'warning', 'error' and mantine color, hex and rgb color
    :param background_color: alert background color,support mantine color, hex and rgb color
    :param size: alert size,support mantine size and int in px
    :param font: alert font,support mantine font and str

	:return: list of selected item label or index
    """
    params = locals()
    params = {k: parse_theme(k, v) for k, v in params.items()}
    style = ''
    # if params['color']:
    #     style = f"color: {params['color']};"
    if params['font']:
        style += f"font-family: {params['font']};"

    if style != '':
        body_ = """
        <span style="{style}">{body}</span>
        """.format(body=body, style=style)
    else:
        body_ = body
    print(body_)
    return st.markdown(body_, unsafe_allow_html=True)
