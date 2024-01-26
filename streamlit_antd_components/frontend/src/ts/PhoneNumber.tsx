// AntdPhoneNumber.tsx

import React, { useEffect, useState } from "react";
import { ConfigProvider, Input, Select } from 'antd';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Streamlit } from "streamlit-component-lib";
import { getTheme } from "../js/utils.react"
import { BaseProp, LabelWrap } from "./utils";
import '../css/color_picker.css'

const { Option } = Select;

interface AntdPhoneNumberProps extends BaseProp {
  label: any;
  description: any;
}

const AntdPhoneNumber = (props: AntdPhoneNumberProps) => {
  // get data
  const theme  = getTheme(props);
  const label = props['label'];
  const description = props['description'];

  // state
  const [value, setValue] = useState('34');

  // component height
  useEffect(() => Streamlit.setFrameHeight());

  // callback
  const onChange = (value: string) => {
    setValue(value);
    Streamlit.setComponentValue(value);
  };


  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            ...theme, // You can customize Input styles here if needed
          },
          Select: {
            ...theme, // You can customize Select styles here if needed
          },
        },
      }}
    >
      <LabelWrap
        label={label}
        desc={description}
        grow={true}
        children={
          <PhoneInput
            international
            defaultCountry="US"
            countrySelectProps={{ showFlags: true }}
            onChange={onChange}
            inputComponent={(inputProps) => (
              <Input
                {...inputProps}
                style={{ width: '100%' }}
                addonBefore={
                  <Select
                    defaultValue="+1"
                    style={{ width: 80 }}
                    onChange={(value) => onChange(value)}
                  >
                    <Option value="+1">+1 (USA)</Option>
                    <Option value="+34">+34 (Spain)</Option>
                    {/* Add more countries as needed */}
                  </Select>
                }
              />
            )}
          />
        }
      />
    </ConfigProvider>
  );
};

export default AntdPhoneNumber;
