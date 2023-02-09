import React from 'react';
import 'jest-styled-components'
import { render } from '@testing-library/react-native';
import { Text } from '..';
import {themeLight} from '../../../constants/styles/themes/light'

describe('Text Snapshot', () => {
  it('should render without props', () => {
    const tree = render(<Text theme={themeLight}>Hello world test.</Text>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render with primary color', () => {
    const tree = render(<Text theme={themeLight} color="primary" >Hello world test.</Text>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render with typography body1', () => {
    const tree = render(<Text theme={themeLight} typography="body1" >Hello world test.</Text>).toJSON()

    expect(tree).toMatchSnapshot()
  })
})