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
  // 8-step in-water pop-up study frames (John John Florence).
  'popup-step-1': require('@/assets/packs/popup-steps/1.jpg'),
  'popup-step-2': require('@/assets/packs/popup-steps/2.jpg'),
  'popup-step-3': require('@/assets/packs/popup-steps/3.jpg'),
  'popup-step-4': require('@/assets/packs/popup-steps/4.jpg'),
  'popup-step-5': require('@/assets/packs/popup-steps/5.jpg'),
  'popup-step-6': require('@/assets/packs/popup-steps/6.jpg'),
  'popup-step-7': require('@/assets/packs/popup-steps/7.jpg'),
  'popup-step-8': require('@/assets/packs/popup-steps/8.jpg'),
};

const GUIDE_FALLBACK = 'popup';

export function packImage(key: string): ImageSourcePropType {
  if (PACK_IMAGES[key]) return PACK_IMAGES[key];
  // Guide step keys fall back to the pop-up hero until JPGs are added.
  if (key.startsWith('popup-step-')) return PACK_IMAGES[GUIDE_FALLBACK];
  return PACK_IMAGES.wave;
}
