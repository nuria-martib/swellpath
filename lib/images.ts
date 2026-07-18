import type { ImageSourcePropType } from 'react-native';

// Static requires so Metro bundles the assets. Keys match Pack.heroImage / PackStep.image.
export const PACK_IMAGES: Record<string, ImageSourcePropType> = {
  popup: require('@/assets/packs/popup.png'),
  surfskate: require('@/assets/packs/surfskate.png'),
  wave: require('@/assets/packs/wave.png'),
  bottomturn: require('@/assets/packs/bottomturn.png'),
  carve: require('@/assets/packs/carve.png'),
  cutback: require('@/assets/packs/cutback.png'),
  topturn: require('@/assets/packs/topturn.png'),
  air: require('@/assets/packs/air.png'),
};

export function packImage(key: string): ImageSourcePropType {
  return PACK_IMAGES[key] ?? PACK_IMAGES.wave;
}
