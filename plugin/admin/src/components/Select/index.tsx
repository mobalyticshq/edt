/*
 *
 * HomePage
 *
 */

import React, {useEffect, useState} from "react"
import {Combobox, ComboboxOption} from '@strapi/design-system';
import {MessageDescriptor} from 'react-intl';
import {getFetchClient} from '@strapi/helper-plugin';
import {pluginId} from '../../../../common/pluginId';
import {StaticDataType} from "../../../../common/data";

interface StaticDataSelectProps {
  intlLabel: MessageDescriptor;
  description: MessageDescriptor;
  placeholder: MessageDescriptor;
  required: boolean;
  disabled: boolean;
  error: string;
  name: string;
  type: string;
  value?: string;
  attribute: { type: string; [key: string]: unknown };
  onChange: (event: { target: { name: string; value: string; type: string } }) => void;
}

const Input = React.forwardRef((props: StaticDataSelectProps, ref) => {
  const [staticDataTypeOptions, setStaticDataTypeOptions] = useState<StaticDataType[]>([])
  const staticDataType = props.type.replace(`plugin::${pluginId}.`, '');
  const name = props.name

  const handleChange = (staticDataID: string) => {
    props.onChange({
      target: {name, type: props.attribute.type, value: staticDataID},
    });
  };

  const getListOfStaticDataOptions = async () => {
    const {get} = getFetchClient();
    const resp = await get(`/${pluginId}/types/${staticDataType}/options`);
    if (resp.data.length > 0) {
      setStaticDataTypeOptions(resp.data)
    }

  };

  useEffect(() => {
    getListOfStaticDataOptions()
  }, [])

  return (
    <label>
      <Combobox
        ref={ref}
        label={props.intlLabel?.defaultMessage}
        required={props.required}
        placeholder={props.placeholder?.defaultMessage}
        hint={props.description?.defaultMessage}
        disabled={props.disabled}
        error={props.error}
        onChange={handleChange}
        value={props.value}
      >
        {staticDataTypeOptions.map((option: StaticDataType) => <ComboboxOption
          value={option.slug}>{option.name}</ComboboxOption>)}
      </Combobox>
    </label>
  );
});

export default Input;
