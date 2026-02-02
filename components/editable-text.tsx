'use client'

import { useState, useEffect, ElementType, ComponentPropsWithoutRef } from 'react'
import { useAdmin } from '@/components/admin-provider'
import { cn } from '@/lib/utils'

type EditableTextProps<T extends ElementType = 'p'> = {
  storageKey: string
  defaultValue: string
  as?: T
  className?: string
  multiline?: boolean
} & Omit<ComponentPropsWithoutRef<T>, 'children'>

export function EditableText<T extends ElementType = 'p'>({
  storageKey,
  defaultValue,
  as,
  className,
  multiline = false,
  ...props
}: EditableTextProps<T>) {
  const Component = as || 'p'
  const { isAdmin } = useAdmin()
  const [value, setValue] = useState(defaultValue)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(`content-${storageKey}`)
    if (stored) setValue(stored)
  }, [storageKey])

  const handleSave = (newValue: string) => {
    const trimmed = newValue.trim() || defaultValue
    setValue(trimmed)
    localStorage.setItem(`content-${storageKey}`, trimmed)
    setIsEditing(false)
  }

  if (!isAdmin) {
    return (
      <Component className={className} {...props}>
        {value}
      </Component>
    )
  }

  if (multiline || isEditing) {
    return (
      <textarea
        className={cn(
          className,
          'bg-primary/10 border-2 border-primary/30 rounded px-2 py-1 w-full resize-y min-h-[100px] focus:border-primary focus:outline-none'
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => handleSave(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            const stored = localStorage.getItem(`content-${storageKey}`)
            setValue(stored || defaultValue)
            setIsEditing(false)
          }
        }}
        autoFocus={isEditing}
      />
    )
  }

  return (
    <Component
      className={cn(
        className,
        'bg-primary/10 border-2 border-dashed border-primary/30 rounded px-2 py-1 cursor-text hover:border-primary/50 transition-colors'
      )}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e: React.FocusEvent<HTMLElement>) =>
        handleSave(e.currentTarget.textContent || defaultValue)
      }
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          e.currentTarget.blur()
        }
        if (e.key === 'Escape') {
          const stored = localStorage.getItem(`content-${storageKey}`)
          e.currentTarget.textContent = stored || defaultValue
          e.currentTarget.blur()
        }
      }}
      {...props}
    >
      {value}
    </Component>
  )
}

// For editing arrays of content (like articles, solutions, etc.)
interface EditableArrayProps<T> {
  storageKey: string
  defaultItems: T[]
  renderItem: (item: T, index: number, isAdmin: boolean, onUpdate: (newItem: T) => void, onDelete: () => void) => React.ReactNode
  renderAddButton?: () => React.ReactNode
  createNewItem: () => T
}

export function EditableArray<T>({
  storageKey,
  defaultItems,
  renderItem,
  renderAddButton,
  createNewItem,
}: EditableArrayProps<T>) {
  const { isAdmin } = useAdmin()
  const [items, setItems] = useState<T[]>(defaultItems)

  useEffect(() => {
    const stored = localStorage.getItem(`content-${storageKey}`)
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch {
        setItems(defaultItems)
      }
    }
  }, [storageKey, defaultItems])

  const saveItems = (newItems: T[]) => {
    setItems(newItems)
    localStorage.setItem(`content-${storageKey}`, JSON.stringify(newItems))
  }

  const handleUpdate = (index: number, newItem: T) => {
    const newItems = [...items]
    newItems[index] = newItem
    saveItems(newItems)
  }

  const handleDelete = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    saveItems(newItems)
  }

  const handleAdd = () => {
    const newItems = [...items, createNewItem()]
    saveItems(newItems)
  }

  return (
    <>
      {items.map((item, index) =>
        renderItem(
          item,
          index,
          isAdmin,
          (newItem) => handleUpdate(index, newItem),
          () => handleDelete(index)
        )
      )}
      {isAdmin && renderAddButton && (
        <button
          onClick={handleAdd}
          className="flex items-center justify-center w-full h-32 border-2 border-dashed border-primary/30 rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors text-primary/50 hover:text-primary"
        >
          + Add New Item
        </button>
      )}
    </>
  )
}
