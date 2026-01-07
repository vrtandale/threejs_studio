import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useStudioStore } from '@/app/studio/store/studio-store'

type LightType =
    | 'ambient'
    | 'directional'
    | 'point'
    | 'spot'
    | 'hemisphere'
    | 'rectarea'



const SidebarLightAdded = () => {
    const { LightHelper, setLightHelper } = useStudioStore()

    const addLight = (type: LightType) => {
        const DEFAULT_LIGHT = {
            id: crypto.randomUUID(),
            color: '#ffffff',
            intensity: 1,
            distance: 10,
            decay: 2,
            angle: 0.5,
        }
        setLightHelper([
            ...LightHelper,
            {
                active: type,
                ...DEFAULT_LIGHT,
            },
        ])
        console.log(LightHelper)
    }

    return (
        <Card className="w-full rounded-2xl">
            <CardHeader>
                <CardTitle className="text-lg">Add Light</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Light Type</Label>
                    <Select
                        defaultValue="ambient"
                        onValueChange={(v) => addLight(v as LightType)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select light to add" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ambient">Ambient Light</SelectItem>
                            <SelectItem value="directional">Directional Light</SelectItem>
                            <SelectItem value="point">Point Light</SelectItem>
                            <SelectItem value="spot">Spot Light</SelectItem>
                            <SelectItem value="hemisphere">Hemisphere Light</SelectItem>
                            <SelectItem value="rectarea">RectArea Light</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="pt-2">
                    <p className="text-xs text-muted-foreground">
                        Selecting a light type immediately adds it with default parameters.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                    {(
                        [
                            'ambient',
                            'directional',
                            'point',
                            'spot',
                            'hemisphere',
                            'rectarea',
                        ] as LightType[]
                    ).map((type) => (
                        <Button
                            key={type}
                            variant="secondary"
                            onClick={() => addLight(type)}
                        >
                            + {type}
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default SidebarLightAdded
