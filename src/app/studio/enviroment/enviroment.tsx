import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { useCanvasContext } from '@/threejs/canvas-utils/canvas-provider'
import React from 'react'
import * as THREE from 'three'
import { HDRLoader } from 'three/examples/jsm/Addons.js'

const EnviromentManager = () => {
  const { renderer, scene } = useCanvasContext()
  const loader = new HDRLoader()

  const handleHDREnviromentLoad = async (files: FileList | null) => {
    if (!files || !renderer) return
    const url = URL.createObjectURL(files[0])
    const hdrTexture = await loader.loadAsync(url)
    hdrTexture.mapping = THREE.EquirectangularReflectionMapping
    scene.environment = hdrTexture
    scene.background = hdrTexture
  }

  const handleColorChange = (color: string) => {
    scene.background = new THREE.Color(color)
  }

  const handleCubeMapLoad = async (files: FileList | null) => {
    if (!files || files.length < 6) return
    const urls = Array.from(files).map(f => URL.createObjectURL(f))
    const loader = new THREE.CubeTextureLoader()
    const cube = await loader.loadAsync(urls)
    scene.background = cube
    scene.environment = cube
  }

  return (
    <Card >
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">
          Environment
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="hdr" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="hdr">HDR</TabsTrigger>
            <TabsTrigger value="color">Color</TabsTrigger>
            <TabsTrigger value="cube">Cube</TabsTrigger>
          </TabsList>

          {/* HDR */}
          <TabsContent value="hdr" className="space-y-2">
            <label className="text-xs text-muted-foreground">
              HDR Environment (.hdr)
            </label>
            <Input
              type="file"
              accept=".hdr"
              onChange={e => handleHDREnviromentLoad(e.target.files)}
            />
          </TabsContent>

          {/* Color */}
          <TabsContent value="color" className="space-y-2">
            <label className="text-xs text-muted-foreground">
              Solid Background Color
            </label>
            <Input
              type="color"
              className="h-10 p-1"
              onChange={e => handleColorChange(e.currentTarget.value)}
            />
          </TabsContent>

          {/* Cube Map */}
          <TabsContent value="cube">
            <CubeMapUI onLoad={handleCubeMapLoad} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default EnviromentManager


const CubeMapUI = ({ onLoad }: { onLoad: (files: FileList) => void }) => {
  const inputsRef = React.useRef<Record<string, HTMLInputElement | null>>({})

  const faces = [
    { key: 'px', label: '+X' },
    { key: 'nx', label: '-X' },
    { key: 'py', label: '+Y' },
    { key: 'ny', label: '-Y' },
    { key: 'pz', label: '+Z' },
    { key: 'nz', label: '-Z' },
  ]

  const handleLoad = () => {
    const files = faces
      .map(f => inputsRef.current[f.key]?.files?.[0])
      .filter(Boolean) as File[]

    if (files.length !== 6) {
      alert('Select all 6 cube faces')
      return
    }

    const dt = new DataTransfer()
    files.forEach(f => dt.items.add(f))
    onLoad(dt.files)
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {faces.map(face => (
          <div key={face.key} className="space-y-1">
            <div className="text-xs text-muted-foreground text-center">
              {face.label}
            </div>
            <input
              type="file"
              accept="image/*"
              className="text-xs"
              //@ts-expect-error
              ref={el => (inputsRef.current[face.key] = el)}
            />
          </div>
        ))}
      </div>

      <Button size="sm" className="w-full" onClick={handleLoad}>
        Load Cube Map
      </Button>
    </div>
  )
}
