import { RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import type { PixelTrailSettings } from "@/lib/pixel-trail-settings"

type PixelTrailControlsProps = {
  value: PixelTrailSettings
  onChange: (next: PixelTrailSettings) => void
  onReset: () => void
}

function NumberSlider({
  id,
  label,
  value,
  min,
  max,
  step,
  format = (n) => n.toString(),
  onChange,
}: {
  id: string
  label: string
  value: number
  min: number
  max: number
  step: number
  format?: (value: number) => string
  onChange: (value: number) => void
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={id} className="text-xs font-normal text-muted-foreground">
          {label}
        </Label>
        <span className="font-mono text-[11px] tabular-nums">{format(value)}</span>
      </div>
      <Slider
        id={id}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(next) => {
          const parsed = Array.isArray(next) ? next[0] : next
          if (typeof parsed === "number") onChange(parsed)
        }}
      />
    </div>
  )
}

function ToggleRow({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Label htmlFor={id} className="text-xs font-normal text-muted-foreground">
        {label}
      </Label>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        size="sm"
      />
    </div>
  )
}

export function PixelTrailControls({
  value,
  onChange,
  onReset,
}: PixelTrailControlsProps) {
  const patch = (partial: Partial<PixelTrailSettings>) =>
    onChange({ ...value, ...partial })

  return (
    <Card
      size="sm"
      className="max-h-[min(70svh,560px)] w-[min(calc(100vw-1.5rem),280px)] overflow-y-auto bg-card/85 backdrop-blur-md"
    >
      <CardHeader className="border-b">
        <CardTitle>Trail</CardTitle>
        <CardAction>
          <Button variant="ghost" size="xs" onClick={onReset}>
            <RotateCcw />
            Reset
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 py-3">
        <ToggleRow
          id="fullyRevealed"
          label="Full reveal"
          checked={value.fullyRevealed}
          onCheckedChange={(fullyRevealed) => patch({ fullyRevealed })}
        />
        <NumberSlider
          id="imageScale"
          label="Image scale"
          value={value.imageScale}
          min={0.2}
          max={1}
          step={0.01}
          format={(n) => n.toFixed(2)}
          onChange={(imageScale) => patch({ imageScale })}
        />
        <NumberSlider
          id="pixelSize"
          label="Pixel size"
          value={value.pixelSize}
          min={12}
          max={80}
          step={1}
          onChange={(pixelSize) => patch({ pixelSize })}
        />
        <NumberSlider
          id="radius"
          label="Radius"
          value={value.radius}
          min={0}
          max={160}
          step={1}
          onChange={(radius) => patch({ radius })}
        />
        <NumberSlider
          id="fadeDuration"
          label="Fade duration"
          value={value.fadeDuration}
          min={120}
          max={2500}
          step={10}
          format={(n) => `${n}ms`}
          onChange={(fadeDuration) => patch({ fadeDuration })}
        />
        <NumberSlider
          id="maxPixels"
          label="Max pixels"
          value={value.maxPixels}
          min={8}
          max={200}
          step={1}
          onChange={(maxPixels) => patch({ maxPixels })}
        />
        <NumberSlider
          id="initialPixels"
          label="Initial pixels"
          value={value.initialPixels}
          min={0}
          max={80}
          step={1}
          onChange={(initialPixels) => patch({ initialPixels })}
        />
      </CardContent>
    </Card>
  )
}
