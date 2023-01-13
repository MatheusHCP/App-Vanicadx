import React from 'react';
import {render} from '@testing-library/react-native';
import {Separator} from '..';

describe('Separator Render', () => {
  it('should render without props', () => {
    const {container} = render(<Separator />);
    
    expect(container.props).toEqual({});
  });

  it('should render with height', () => {
    const {container} = render(<Separator height={16}/>);
    
    expect(container.props).toEqual({height: 16});
  });

  it('should render with width', () => {
    const {container} = render(<Separator width={16}/>);
    
    expect(container.props).toEqual({width: 16});
  });

  it('should render with width and height prop', () => {
    const {container} = render(<Separator width={16} height={16}/>);
    
    // expect(container.props).toEqual({width: 16, height: 16}); pode usar desse jeito ou
    expect(container.props.height).toBe(16);
    expect(container.props.width).toBe(16);
  });

  it('should find separator by testID', () => {
    const {getByTestId} = render(<Separator />);
    const separator = getByTestId('separator');

    expect(separator).toBeTruthy();
  });
});
