import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Baseado em um design para iPhone 11 (414 x 896)
const baseWidth = 414;
const baseHeight = 896;

/**
 * Escala um valor baseado na largura da tela
 */
export const scaleWidth = (size: number): number => {
  return (SCREEN_WIDTH / baseWidth) * size;
};

/**
 * Escala um valor baseado na altura da tela
 */
export const scaleHeight = (size: number): number => {
  return (SCREEN_HEIGHT / baseHeight) * size;
};

/**
 * Escala fonte baseada no tamanho da tela e densidade de pixels
 */
export const scaleFont = (size: number): number => {
  const scale = SCREEN_WIDTH / baseWidth;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Escala moderadamente (melhor para espaçamentos e padding)
 * Factor de 0.5 significa que cresce apenas 50% do que cresceria normalmente
 */
export const moderateScale = (size: number, factor: number = 0.5): number => {
  const scale = SCREEN_WIDTH / baseWidth;
  return size + (scale - 1) * size * factor;
};

/**
 * Retorna se é uma tela pequena (menor que 375px de largura)
 */
export const isSmallScreen = (): boolean => {
  return SCREEN_WIDTH < 375;
};

/**
 * Retorna se é uma tela média (entre 375px e 414px de largura)
 */
export const isMediumScreen = (): boolean => {
  return SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
};

/**
 * Retorna se é uma tela grande (414px ou mais de largura)
 */
export const isLargeScreen = (): boolean => {
  return SCREEN_WIDTH >= 414;
};

/**
 * Retorna dimensões da tela
 */
export const screenDimensions = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
};
