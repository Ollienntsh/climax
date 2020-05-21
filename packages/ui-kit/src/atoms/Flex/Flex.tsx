import styled from '@emotion/styled';
import {
  AlignItemsProperty,
  BackgroundColorProperty,
  FlexDirectionProperty,
  MarginProperty,
  PaddingProperty,
  BoxShadowProperty,
  HeightProperty,
  WidthProperty,
} from 'csstype';

export interface FlexProps {
  background?: BackgroundColorProperty;
  alignItems?: AlignItemsProperty;
  direction?: FlexDirectionProperty;
  gutter?: number;
  height?: HeightProperty<number>;
  margin?: MarginProperty<number>;
  padding?: PaddingProperty<number>;
  shadow?: BoxShadowProperty;
  width?: WidthProperty<number>;
}

const spaceSize = 4;

/**
 * Gutter enhancer applies gutter ONLY between items.
 */
export const gutter = ({
  gutter,
  direction,
}: Pick<FlexProps, 'direction' | 'gutter'>) => {
  if (!gutter) {
    return;
  }
  const gutterRule = `margin${direction === 'column' ? 'Bottom' : 'Right'}`;
  return {
    '& > *': {
      [gutterRule]: (gutter || 0) * spaceSize,
    },
    '& > *:last-child': {
      [gutterRule]: 0,
    },
  };
};

export default styled.div<FlexProps>(
  ({
    alignItems,
    background,
    direction,
    height,
    margin,
    padding,
    shadow,
    width,
  }) => ({
    background,
    height,
    margin,
    padding,
    width,
    alignItems: alignItems || 'left',
    boxShadow: shadow,
    display: 'flex',
    flexDirection: direction,
  }),
  gutter,
);
