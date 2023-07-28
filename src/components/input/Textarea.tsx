'use client'
import clsx from 'clsx'
import React, { useState } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface TextareaProps {
  register: UseFormRegister<FieldValues>
  id: string
  placeholder?: string
  isUnderline?: boolean
}

const Textarea: React.FC<TextareaProps> = ({
  register,
  id,
  placeholder,
  isUnderline,
}) => {
  const [value, setValue] = useState('')
  const rows = value.split('\n').length
  const [isFocus, setIsFocus] = useState(false)

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
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value),
      })}
    />
  )
}

export default Textarea
