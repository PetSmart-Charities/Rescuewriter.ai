import Image from 'next/image'
import React, { useState, useEffect, startTransition } from 'react'
import Select, { components, DropdownIndicatorProps, OnChangeValue } from 'react-select'

import { Option, CustomSelectProps } from '../types/index.d'

export const CustomSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false,
  required = false,
  setPetAgeOptions
}: CustomSelectProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    startTransition(() => {
      setIsMounted(true)
    })
  }, [])
  const onChange = (option: OnChangeValue<Option | Option[], any>) => {
    setPetAgeOptions && setPetAgeOptions(option)
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

  const DropdownIndicator = (props: DropdownIndicatorProps) => {
    return (
      <components.DropdownIndicator {...props}>
        <></>
      </components.DropdownIndicator>
    )
  }

  return (
    <div suppressHydrationWarning>
      {isMounted ? (
        <Select
          className={className}
          components={{ DropdownIndicator }}
          name={field.name}
          instanceId={field.name}
          value={getValue()}
          onChange={onChange}
          placeholder={placeholder}
          options={options}
          isMulti={isMulti}
          required={required}
          isSearchable={false}
          unstyled={false}
          styles={{
            container: (baseStyles, state) => ({
              ...baseStyles,
              // border: `1px solid ${state.isFocused ? '#db3a00' : '#000'}`,
              borderRadius: '8px',
              height: '50px'
            }),
            control: (baseStyles, state) => ({
              ...baseStyles,
              background: 'url("/img/psc-dropdown.svg") 92% 45% no-repeat white',
              border: `0`,
              borderRadius: '9999px',
              boxShadow: 'none',
              outline: `2px solid ${state.isFocused ? 'transparent' : 'transparent'}`,
              outlineOffset: '2px',
              padding: '10px 8px'
            }),
            dropdownIndicator: (baseStyles, state) => ({
              ...baseStyles,
              background: 'transparent'
            }),
            indicatorsContainer: (baseStyles, state) => ({
              ...baseStyles,
              border: 'none'
            }),
            indicatorSeparator: (baseStyles, state) => ({
              ...baseStyles,
              width: 0
            }),
            menu: (baseStyles, state) => ({
              ...baseStyles,
              border: '1px solid #db3a00',
              borderRadius: '8px',
              overflow: 'hidden'
            }),
            menuList: (baseStyles, state) => ({
              ...baseStyles,

              padding: 0
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              background: state.isSelected ? '#F5F7EF' : 'white',
              color: 'black'
            })
          }}
          theme={theme => ({
            ...theme,
            border: 0,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              danger: '#db3a00', // errors
              dangerLight: '#db3a00', // also error
              neutral0: 'white', // option background
              neutral20: 'black', // unfocused border
              neutral80: 'black', // text color
              primary: 'black', // selected in drop down
              primary25: '#F5F7EF',
              primary50: '#F5F7EF' // click in dropdown
            }
          })}
        />
      ) : (
        <div
          className={className}
          style={{
            height: '50px',
            borderRadius: '9999px',
            border: '2px solid transparent',
            padding: '10px 8px',
            background: 'url("/img/psc-dropdown.svg") 92% 45% no-repeat white',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div style={{ padding: '0 10px', color: '#999' }}>{placeholder}</div>
        </div>
      )}
    </div>
  )
}

export default CustomSelect
