import React from 'react'
import Select, { OnChangeValue } from 'react-select'
import { Option, MultiSelectProps } from '../types/index.d'

export const MultiSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false
}: MultiSelectProps) => {
  const onChange = (option: OnChangeValue<Option | Option[], any>) => {
    form.setFieldValue(
      field.name,
      isMulti ? (option as Option[]).map((item: Option) => item.value) : (option as Option).value
    )
  }

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(option => field.value?.indexOf(option.value) >= 0)
        : options.find(option => option.value === field.value)
    } else {
      return isMulti ? [] : ('' as any)
    }
  }

  return (
    <Select
      className={className}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
    />
  )
}

export default MultiSelect
