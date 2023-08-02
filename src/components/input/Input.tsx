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
  value?: string | null
}

const Input: React.FC<InputProps> = ({
  type,
  disabled,
  label,
  id,
  register,
  required,
  value,
}) => {
  const [onFocus, setOnFocus] = useState(false)

  return (
    <label
      onClick={() => setOnFocus(true)}
      htmlFor={id}
      className={clsx(
        `block relative px-2 py-1 rounded-sm min-w-[20rem]`,
        onFocus || value ? 'ring-sky-400 ring-2' : 'ring-1 ring-gray-400',
      )}
    >
      <div
        className={clsx(
          'transition relative leading-6 origin-left text-md',
          onFocus || value ? 'text-sky-400' : 'text-gray-400 translate-y-[50%] scale-110',
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
        })}
      />
    </label>
  )
}

export default Input
