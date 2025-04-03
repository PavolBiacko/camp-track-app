import { getRGBColor } from "@/components/ui/gluestack-ui-provider/colors";
import { ColorScheme } from "@/types/base";
import { useMemo } from "react";

export const useSwitchColors = (colorScheme?: ColorScheme) => {
  return useMemo(() => {

    const trackColorOff = getRGBColor('secondary', '50', colorScheme);
    const trackColorOn = getRGBColor('secondary', '300', colorScheme);

    const thumbColorOn = getRGBColor('tertiary', '200', colorScheme);
    const thumbColorOff = getRGBColor('primary', '200', colorScheme);

    return { trackColorOff, trackColorOn, thumbColorOn, thumbColorOff };
  }, [colorScheme]);
}
