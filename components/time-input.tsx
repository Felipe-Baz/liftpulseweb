import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { formatMinSecInput, parseMinSecToSeconds } from "../utils/format"

interface TimeInputProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function TimeInput({ value, onChange, className }: TimeInputProps) {
  const [displayValue, setDisplayValue] = useState("00:00")

  useEffect(() => {
    // When receiving a new value (in seconds), format it as MM:SS
    if (value) {
      const seconds = Number.parseInt(value)
      if (!isNaN(seconds)) {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        setDisplayValue(`${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`)
      }
    } else {
      setDisplayValue("00:00")
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    const formattedValue = formatMinSecInput(newValue)
    setDisplayValue(formattedValue)

    // Convert MM:SS to seconds before calling onChange
    const seconds = parseMinSecToSeconds(formattedValue)
    onChange(seconds.toString())
  }

  return (
    <Input
      type="text"
      value={displayValue}
      onChange={handleChange}
      className={className}
      placeholder="00:00"
      maxLength={5}
    />
  )
}

