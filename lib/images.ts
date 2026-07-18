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
  // Pop-Up Pack step photos.
  'popup-water': require('@/assets/packs/popup-water.jpg'),
  'popup-land': require('@/assets/packs/popup-land.png'),
  // 8-step in-water pop-up study frames (John John Florence).
  'popup-step-1': require('@/assets/packs/popup-steps/1.jpg'),
  'popup-step-2': require('@/assets/packs/popup-steps/2.jpg'),
  'popup-step-3': require('@/assets/packs/popup-steps/3.jpg'),
  'popup-step-4': require('@/assets/packs/popup-steps/4.jpg'),
  'popup-step-5': require('@/assets/packs/popup-steps/5.jpg'),
  'popup-step-6': require('@/assets/packs/popup-steps/6.jpg'),
  'popup-step-7': require('@/assets/packs/popup-steps/7.jpg'),
  'popup-step-8': require('@/assets/packs/popup-steps/8.jpg'),
  // Bottom Turn Pack step photos — user will upload frames to
  // assets/packs/bottomturn-steps/1.jpg..6.jpg, then uncomment below.
  // 'bottomturn-step-1': require('@/assets/packs/bottomturn-steps/1.jpg'),
  // 'bottomturn-step-2': require('@/assets/packs/bottomturn-steps/2.jpg'),
  // 'bottomturn-step-3': require('@/assets/packs/bottomturn-steps/3.jpg'),
  // 'bottomturn-step-4': require('@/assets/packs/bottomturn-steps/4.jpg'),
  // 'bottomturn-step-5': require('@/assets/packs/bottomturn-steps/5.jpg'),
  // 'bottomturn-step-6': require('@/assets/packs/bottomturn-steps/6.jpg'),
};

export function packImage(key: string): ImageSourcePropType {
  if (PACK_IMAGES[key]) return PACK_IMAGES[key];
  // Guide step keys fall back to their pack hero until real JPGs are added.
  if (key.startsWith('popup-step-')) return PACK_IMAGES.popup;
  if (key.startsWith('bottomturn-step-')) return PACK_IMAGES.bottomturn;
  return PACK_IMAGES.wave;
}
