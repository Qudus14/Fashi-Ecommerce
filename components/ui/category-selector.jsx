"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {useRouter} from "next/navigation";
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "Clothings",
    label: "Clothings",
  },
  {
    value: "Footwear",
    label: "Footwear",
  },
  {
    value: "Grooming and Accessories",
    label: "Grooming and Accessories",
  },
  {
    value: "Electronics and Gadgets",
    label: "Electronics and Gadgets",
  },
  {
    value: "Health and Wellness",
    label: "Health and Wellness",
  },
  {
    value: "Home and Kitchen",
    label: "Home and Kitchen",
  },
]

export function CategorySelectorComponent() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const handleSelect = (currentValue) => {
    setValue(currentValue === value ? "" : currentValue)
    setOpen(false)
    router.push(`/search?q=${encodeURIComponent(currentValue)}`)
  }

  const handleSearch = (searchValue) => {
    router.push(`/search?q=${encodeURIComponent(searchValue)}`)
  }


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-full relative flex sm:justify-start justify-center sm:flex-none items-center space-x-2 bg-customYellow hover:bg-customYellow/95 hover:text-white text-white font-bold py-2 px-4 rounded"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput 
          placeholder="Search category..."
          className="h-9"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(e.currentTarget.value)
            }
          }}
           />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={handleSelect}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
