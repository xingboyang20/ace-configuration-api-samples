import { alpha, tint } from './color';

//--- Colors
export const BRAND_COLOR = '#02225a';
export const LINK_COLOR = BRAND_COLOR;
export const TEXT_COLOR = BRAND_COLOR;
export const ALT_TEXT_COLOR = '#fff';
export const TEXT_COLOR_HOVER = alpha(TEXT_COLOR, 0.2);

export const WHITE_TRANS_025 = 'rgba(255, 255, 255, .025)';
export const WHITE_TRANS_05 = 'rgba(255, 255, 255, .05)';
export const WHITE_TRANS_1 = 'rgba(255, 255, 255, .1)';
export const WHITE_TRANS_2 = 'rgba(255, 255, 255, .2)';
export const WHITE_TRANS_3 = 'rgba(255, 255, 255, .3)';
export const WHITE_TRANS_5 = 'rgba(255, 255, 255, .5)';

export const BRAND_COLOR_TRANS_05 = alpha(BRAND_COLOR, 0.05);
export const BRAND_COLOR_TRANS_1 = alpha(BRAND_COLOR, 0.1);
export const BRAND_COLOR_TRANS_2 = alpha(BRAND_COLOR, 0.2);
export const BRAND_COLOR_TRANS_5 = alpha(BRAND_COLOR, 0.5);
export const BRAND_COLOR_TRANS_75 = alpha(BRAND_COLOR, 0.75);
export const BRAND_COLOR_TRANS_90 = alpha(BRAND_COLOR, 0.9);

export const GRAY_COLOR = '#f5f5f5';
export const GRAY_COLOR_LIGHT = '#fafafa';
export const GRAY_COLOR_BORDER = '#e6e6e6';
export const GRAY_COLOR_ALPHA = 0.0392156862745098;

export const BLUEGRAY_COLOR_LIGHT = '#ccd3de';
export const BLUEGRAY_COLOR_MEDIUM = '#8090ac';

export const NORMAL_BG = '#f2f4f7';
export const NORMAL_BG_HOVER = '#e5e8ee';
export const NORMAL_BG_DISABLED = '#fafbfc';

export const ERROR_COLOR = '#F73F32';
export const ERROR_BG = '#ffd7d7';
export const ERROR_BG_HOVER = '#ffc9c9';
export const ERROR_BG_DISABLED = '#ffe3e3';

export const SUCCESS_COLOR = '#00BE66';
export const SUCCESS_BG = '#e6f1e6';
export const SUCCESS_BG_HOVER = '#daf2da';
export const SUCCESS_BG_DISABLED = '#f0f2f0';

export const WARNING_COLOR = '#A89A00';
export const WARNING_BG = '#fff7cc';
export const WARNING_BG_HOVER = '#fff4bf';
export const WARNING_BG_DISABLED = '#fff9d9';

export const HALF_DEFAULT_TRANSITION_DURATION = '400ms';
export const DEFAULT_TRANSITION_DURATION = '800ms';
export const COLOR_TRANSITION_DURATION = '200ms';

//--- Fonts
export const FONT_WEIGHT_REGULAR = 400;
export const FONT_WEIGHT_DEMIBOLD = 600;
export const FONT_WEIGHT_BOLD = 700;
export const FONT_BASE_SIZE = '14px';
export const BASE_LINE_HEIGHT = '24px';

export const ASSET_URL =
  'https://clmcloudwebstorage.blob.core.windows.net/assets/v1';

export const FONT_FAMILY_SANS = `-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif`;

export const FONT_FAMILY_MONO =
  'Monaco, Consolas, Courier New, monospace, serif';

//--- Z-index hierarchy
export const MODAL_ZINDEX = 1000;
export const PROGESS_ZINDEX = MODAL_ZINDEX - 100;
export const APPBAR_ZINDEX = PROGESS_ZINDEX - 100;
export const DROPDOWN_ZINDEX = APPBAR_ZINDEX - 100;
export const ALERT_ZINDEX = DROPDOWN_ZINDEX - 100;
export const MENU_ZINDEX = ALERT_ZINDEX - 100;
export const TAB_ITEM_ZINDEX = MENU_ZINDEX - 100;

//--- Misc
export const ICON_APP_BUTTON_HEIGHT = '100px';
export const ICON_BUTTON_HEIGHT = '40px';
export const BOX_PADDING = '30px';
export const TAB_ITEM_HEIGHT_NORMAL = '47px';
export const TAB_ITEM_HEIGHT_TIGHT = '28px';
export const BUTTON_HEIGHT = '36px';
export const BUTTON_HEIGHT_TIGHT = '28px';
export const INPUT_PADDING = '12px';
export const INPUT_MAX_WIDTH = '300px';
export const LIST_SHADOW = '0 2px 6px 0 rgba(2, 34, 90, 0.3)';
export const LIST_HOVER_COLOR = alpha(BRAND_COLOR, 0.1);
export const LIST_BORDER_COLOR = LIST_HOVER_COLOR;
export const BORDER_RADIUS = '3px';
export const PLACEHOLDER_COLOR = tint(BRAND_COLOR, 50).toHexString();

//--- Break Points (media query)
export const BREAK_POINT_HORIZONTAL_XLARGE = '2560px';
export const BREAK_POINT_HORIZONTAL_LARGE = '1920px';
export const BREAK_POINT_HORIZONTAL_MEDIUM = '1280px';
export const BREAK_POINT_HORIZONTAL_SMALL = '950px';
export const BREAK_POINT_HORIZONTAL_XSMALL = '768px';
export const BREAK_POINT_VERTICAL_LARGE = '1440px';
export const BREAK_POINT_VERTICAL_MEDIUM = '1024px';
export const BREAK_POINT_VERTICAL_SMALL = '800px';
export const BREAK_POINT_VERTICAL_XSMALL = '768px';
