'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
  label: string
  id: string
  register: UseFormRegister<FieldValues>
  disabled?: boolean
  type?: string
  required?: boolean
}

const Input: React.FC<InputProps> = ({
  type,
  disabled,
  label,
  id,
  register,
  required,
}) => {
  const [onFocus, setOnFocus] = useState(false)
  const [valueExsit, setValueExsit] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (valueExsit && e.target.value.length === 0) setValueExsit(false)
    if (!valueExsit && e.target.value.length > 0) setValueExsit(true)
  }

  return (
    <label
      onClick={() => setOnFocus(true)}
      htmlFor={id}
      className={clsx(
        `block relative px-2 py-1 rounded-sm min-w-[20rem]`,
        onFocus ? 'ring-sky-400 ring-2' : 'ring-1 ring-gray-400',
      )}
    >
      <div
        className={clsx(
          'transition relative leading-6 origin-left text-md',
          onFocus ? 'text-sky-400' : 'text-gray-400',
          onFocus || valueExsit ? '' : 'translate-y-[50%] scale-110',
        )}
      >
        {label}
      </div>
      <input
        type={type}
        disabled={disabled}
        id={id}
        autoComplete={id}
        onFocus={() => setOnFocus(true)}
        className={clsx(
          `w-full 
          bg-transparent 
        text-white
          block 
          border-0 outline-none
        focus:ring-sky-900 shadow-sm`,
        )}
        {...register(id, {
          required,
          onBlur: () => setOnFocus(false),
          onChange: handleChange,
        })}
      />
    </label>
  )
}

export default Input
