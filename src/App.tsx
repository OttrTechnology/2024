import { Moon, Sun } from "lucide-react"
import { useMemo, useState } from "react"

import { PixelTrailControls } from "@/components/pixel-trail-controls"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { PixelImageTrail } from "@/components/ui/pixel-image-trail"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import { DEFAULT_PIXEL_TRAIL_SETTINGS } from "@/lib/pixel-trail-settings"

export function App() {
  const { resolvedTheme, setTheme } = useTheme()
  const [settings, setSettings] = useState(DEFAULT_PIXEL_TRAIL_SETTINGS)
  const applied = useDebouncedValue(
    {
      imageScale: settings.imageScale,
      pixelSize: settings.pixelSize,
      radius: settings.radius,
      fadeDuration: settings.fadeDuration,
      maxPixels: settings.maxPixels,
      initialPixels: settings.initialPixels,
    },
    150
  )
  const isDark = resolvedTheme === "dark"
  const logoSrc = useMemo(
    () => (isDark ? "/logo-dark-mode.png" : "/logo-light-mode.png"),
    [isDark]
  )

  return (
    <div className="relative min-h-svh overflow-hidden bg-background text-foreground">
      <PixelImageTrail
        src={logoSrc}
        alt="Ottr logo"
        className="h-svh w-full"
        fullyRevealed={settings.fullyRevealed}
        imageScale={applied.imageScale}
        pixelSize={applied.pixelSize}
        radius={applied.radius}
        fadeDuration={applied.fadeDuration}
        maxPixels={applied.maxPixels}
        initialPixels={applied.initialPixels}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4">
        <p className="pointer-events-none text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Ottr
        </p>
        <Button
          variant="outline"
          size="icon"
          className="pointer-events-auto"
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          {isDark ? <Sun /> : <Moon />}
        </Button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-end p-4">
        <div className="pointer-events-auto">
          <PixelTrailControls
            value={settings}
            onChange={setSettings}
            onReset={() => setSettings(DEFAULT_PIXEL_TRAIL_SETTINGS)}
          />
        </div>
      </div>
    </div>
  )
}

export default App
