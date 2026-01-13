
// app/components/MeshGeometriesUi.tsx
import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Separator } from '@/components/ui/separator'
import { Cuboid, Circle, Lightbulb, WandSparkles } from 'lucide-react'
import useGeometry from './use-geometries-hooks'

const MeshGeometriesUi = () => {
  const addGeom = useGeometry()
  const [loadingKey, setLoadingKey] = useState<string | null>(null)

  const handleAdd = useCallback(
    async (type: 'cube' | 'sphere' | 'pointLight') => {
      try {
        setLoadingKey(type)
        // Your hook returns a factory; invoke factory then the geometry creation
        const create = addGeom(type)
        const result = await Promise.resolve(create()) // support sync/async
        // Optional: show toast feedback
     
      } catch (err) {
        console.error(err)
      } finally {
        setLoadingKey(null)
      }
    },
    [addGeom]
  )

  return (
    <TooltipProvider delayDuration={200}>
      <Card className="w-full max-w-2xl mx-auto border border-muted shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base sm:text-lg">Scene Elements</CardTitle>
              <CardDescription>
                Quickly add preset geometries and lights to your scene.
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAdd('cube')}
              className="gap-2"
            >
              <WandSparkles className="h-4 w-4" />
              Quick Add Cube
            </Button>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          {/* Toolbar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Cube */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="default"
                  className="justify-start gap-2"
                  onClick={() => handleAdd('cube')}
                  disabled={loadingKey === 'cube'}
                >
                  <Cuboid className="h-4 w-4" />
                  Cube
                  {loadingKey === 'cube' && (
                    <span className="ml-auto text-xs text-muted-foreground">Adding…</span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add a unit cube at the origin</p>
              </TooltipContent>
            </Tooltip>

            {/* Sphere */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  className="justify-start gap-2"
                  onClick={() => handleAdd('sphere')}
                  disabled={loadingKey === 'sphere'}
                >
                  <Circle className="h-4 w-4" />
                  Sphere
                  {loadingKey === 'sphere' && (
                    <span className="ml-auto text-xs text-muted-foreground">Adding…</span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add a default sphere</p>
              </TooltipContent>
            </Tooltip>

          </div>

          {/* Optional: Helper text / keyboard hints */}
          <p className="mt-4 text-xs text-muted-foreground">
            Tip: Use <kbd className="px-1 py-0.5 text-[10px] border rounded">Shift</kbd> + click to
            duplicate last geometry (if supported).
          </p>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}

export default MeshGeometriesUi
