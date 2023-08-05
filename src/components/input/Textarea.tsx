'use client'

import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface TextareaProps {
  register: UseFormRegister<FieldValues>
  id: string
  placeholder?: string
  isUnderline?: boolean
  action?: (value: boolean) => void
  label?: string
  value?: string
  border?: boolean
  required?: boolean
}

const Textarea: React.FC<TextareaProps> = ({
  register,
  id,
  placeholder,
  isUnderline,
  label,
  border,
  value = '',
  required,
}) => {
  const [innerValue, setValue] = useState(value!)
  const rows = innerValue.split('\n').length
  const [isFocus, setIsFocus] = useState(false)

  if (!border) {
    return (
      <textarea
        className={clsx(
          'bg-transparent w-full py-2 resize-none outline-none text-white overflow-hidden',
          isUnderline && isFocus && 'border-b-[1px] border-gray-600',
        )}
        placeholder={placeholder}
        id={id}
        rows={rows}
        onFocus={() => setIsFocus(true)}
        {...register(id, {
          required: true,
          onBlur: () => setIsFocus(false),
          onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setValue(e.target.value),
        })}
      />
    )
  }

  return (
    <div
      className={clsx(
        'rounded-sm px-2 py-1',
        isFocus || value ? 'ring-sky-400 ring-2' : 'ring-1 ring-gray-400',
      )}
    >
      <div
        className={clsx(
          'transition relative leading-6 origin-left text-md',
          isFocus || value ? 'text-sky-400' : 'text-gray-400',
          isFocus || value ? '' : 'translate-y-[50%] scale-110',
        )}
      >
        {label}
      </div>
      <textarea
        className={clsx(
          'bg-transparent w-full py-2 resize-none outline-none text-white overflow-hidden',
          isUnderline && isFocus && 'border-b-[1px] border-gray-600',
        )}
        placeholder={placeholder}
        id={id}
        rows={rows}
        onFocus={() => setIsFocus(true)}
        {...register(id, {
          required,
          onBlur: () => setIsFocus(false),
          onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setValue(e.target.value),
        })}
      />
    </div>
  )
}

export default Textarea
