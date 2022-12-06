import { View, Text, Appearance, ColorSchemeName } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { colorSchemeProps, Props, ThemeType } from './types'
import { themeLight } from '../../constants/styles/themes/light'
import { themeDark } from '../../constants/styles/themes/dark'

export default function useAppearence() : Props {
  
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(Appearance.getColorScheme() || 'light')


  const handleChangeAppearence = useCallback(({colorScheme} : colorSchemeProps) => {
    if(colorScheme){
      setCurrentTheme(colorScheme)
    }
  }, [])

  const theme = useMemo(() => {
    if (currentTheme == "light") return themeLight
    return themeDark
  }, [currentTheme])


  useEffect(() => {
    Appearance.addChangeListener(handleChangeAppearence)

    return () => Appearance.addChangeListener(handleChangeAppearence).remove()
  }, [])


  return {currentTheme, theme}
}