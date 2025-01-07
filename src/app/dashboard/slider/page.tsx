"use client";

import { useState } from "react";

import { Slider } from "@/components/ui/slider";

export default function Page() {
    const [sliderValue, setSliderValue] = useState(10);
    const [rangeValue, setRangeValue] = useState([10, 20]);

    return (
        <div className="grid grid-cols-1 gap-3">
            <span>Slider Value: { sliderValue }</span>

            <Slider
                defaultValue={[sliderValue]}
                max={ 100 }
                onValueChange={ (value) => setSliderValue(value[0]) }
                step={ 1 }
            />

            <span>Slider Value: { rangeValue.join(",") }</span>

            <Slider
                defaultValue={rangeValue}
                max={ 100 }
                onValueChange={ setRangeValue }
                step={ 1 }
            />
        </div>
    );
}
