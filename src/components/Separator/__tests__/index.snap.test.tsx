/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { Separator } from '..';

describe('Separator Snap', () => {
  
  it('Should render without props', () => {
    const {toJSON} = renderer.create(<Separator/>);
  
    expect(toJSON()).toMatchSnapshot();
  });

  it('Should render with height props', () => {
    const {toJSON} = renderer.create(<Separator height={15}/>);
  
    expect(toJSON()).toMatchSnapshot();
  });

  it('Should render with width props', () => {
    const {toJSON} = renderer.create(<Separator width={15}/>);
  
    expect(toJSON()).toMatchSnapshot();
  });

  it('Should render with width and height props', () => {
    const {toJSON} = renderer.create(<Separator width={15} height={15}/>);
  
    expect(toJSON()).toMatchSnapshot();
  });

})
