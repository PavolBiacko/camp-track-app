'use client';
import { vars } from 'nativewind';

export const config = {
  light: vars({
    // Primary Colors (Shades of gray for primary elements like buttons, headers)
    '--color-primary-0': '179 179 179', // #B3B3B3 - Lightest gray for primary elements
    '--color-primary-50': '153 153 153', // #999999 - Very light gray for primary elements
    '--color-primary-100': '128 128 128', // #808080 - Light gray for primary elements
    '--color-primary-200': '115 115 115', // #737373 - Medium-light gray for primary elements
    '--color-primary-300': '102 102 102', // #666666 - Medium gray for primary elements
    '--color-primary-400': '82 82 82', // #525252 - Medium-dark gray for primary elements
    '--color-primary-500': '51 51 51', // #333333 - Dark gray for primary elements (base shade)
    '--color-primary-600': '41 41 41', // #292929 - Darker gray for primary elements
    '--color-primary-700': '31 31 31', // #1F1F1F - Very dark gray for primary elements
    '--color-primary-800': '13 13 13', // #0D0D0D - Near-black gray for primary elements
    '--color-primary-900': '10 10 10', // #0A0A0A - Almost black for primary elements
    '--color-primary-950': '8 8 8', // #080808 - Deepest black-gray for primary elements

    /* Secondary Colors (Shades of light gray/white for secondary elements like backgrounds) */
    '--color-secondary-0': '253 253 253', // #FDFDFD - Near-white for secondary elements
    '--color-secondary-50': '251 251 251', // #FBFBFB - Very light gray for secondary elements
    '--color-secondary-100': '246 246 246', // #F6F6F6 - Light gray for secondary elements
    '--color-secondary-200': '242 242 242', // #F2F2F2 - Slightly darker light gray for secondary elements
    '--color-secondary-300': '237 237 237', // #EDEDED - Medium-light gray for secondary elements
    '--color-secondary-400': '230 230 231', // #E6E6E7 - Medium gray for secondary elements
    '--color-secondary-500': '217 217 219', // #D9D9DB - Base medium gray for secondary elements
    '--color-secondary-600': '198 199 199', // #C6C7C7 - Slightly darker gray for secondary elements
    '--color-secondary-700': '189 189 189', // #BDBDBD - Medium-dark gray for secondary elements
    '--color-secondary-800': '177 177 177', // #B1B1B1 - Darker gray for secondary elements
    '--color-secondary-900': '165 164 164', // #A5A4A4 - Dark gray for secondary elements
    '--color-secondary-950': '157 157 157', // #9D9D9D - Deep gray for secondary elements

    /* Tertiary Colors (Shades of orange for accents or highlights) */
    '--color-tertiary-0': '255 250 245', // #FFFAF5 - Very light peach for tertiary elements
    '--color-tertiary-50': '255 242 229', // #FFF2E5 - Light peach for tertiary elements
    '--color-tertiary-100': '255 233 213', // #FFE9D5 - Pale orange for tertiary elements
    '--color-tertiary-200': '254 209 170', // #FED1AA - Soft orange for tertiary elements
    '--color-tertiary-300': '253 180 116', // #FDB474 - Medium orange for tertiary elements
    '--color-tertiary-400': '251 157 75', // #FB9D4B - Vibrant orange for tertiary elements
    '--color-tertiary-500': '231 129 40', // #E78128 - Base orange for tertiary elements
    '--color-tertiary-600': '215 117 31', // #D7751F - Darker orange for tertiary elements
    '--color-tertiary-700': '180 98 26', // #B4621A - Deep orange for tertiary elements
    '--color-tertiary-800': '130 73 23', // #824917 - Dark brown-orange for tertiary elements
    '--color-tertiary-900': '108 61 19', // #6C3D13 - Very dark brown-orange for tertiary elements
    '--color-tertiary-950': '84 49 18', // #543112 - Deepest brown-orange for tertiary elements

    /* Error Colors (Shades of red for error states) */
    '--color-error-0': '254 233 233', // #FEE9E9 - Very light red for error states
    '--color-error-50': '254 226 226', // #FEE2E2 - Light red for error states
    '--color-error-100': '254 202 202', // #FECACA - Pale red for error states
    '--color-error-200': '252 165 165', // #FCA5A5 - Soft red for error states
    '--color-error-300': '248 113 113', // #F87171 - Medium red for error states
    '--color-error-400': '239 68 68', // #EF4444 - Vibrant red for error states
    '--color-error-500': '230 53 53', // #E63535 - Base red for error states
    '--color-error-600': '220 38 38', // #DC2626 - Darker red for error states
    '--color-error-700': '185 28 28', // #B91C1C - Deep red for error states
    '--color-error-800': '153 27 27', // #991B1B - Very dark red for error states
    '--color-error-900': '127 29 29', // #7F1D1D - Darker red for error states
    '--color-error-950': '83 19 19', // #531313 - Deepest red for error states

    /* Success Colors (Shades of green for success states) */
    '--color-success-0': '228 255 244', // #E4FFF4 - Very light green for success states
    '--color-success-50': '202 255 232', // #CAFFE8 - Light green for success states
    '--color-success-100': '162 241 192', // #A2F1C0 - Pale green for success states
    '--color-success-200': '132 211 162', // #84D3A2 - Soft green for success states
    '--color-success-300': '102 181 132', // #66B584 - Medium green for success states
    '--color-success-400': '72 151 102', // #489766 - Vibrant green for success states
    '--color-success-500': '52 131 82', // #348352 - Base green for success states
    '--color-success-600': '42 121 72', // #2A7948 - Darker green for success states
    '--color-success-700': '32 111 62', // #206F3E - Deep green for success states
    '--color-success-800': '22 101 52', // #166534 - Very dark green for success states
    '--color-success-900': '20 83 45', // #14532D - Darker green for success states
    '--color-success-950': '27 50 36', // #1B3224 - Deepest green for success states

    /* Warning Colors (Shades of orange for warning states) */
    '--color-warning-0': '255 249 245', // #FFF9F5 - Very light peach for warning states
    '--color-warning-50': '255 244 236', // #FFF4EC - Light peach for warning states
    '--color-warning-100': '255 231 213', // #FFE7D5 - Pale orange for warning states
    '--color-warning-200': '254 205 170', // #FECDAA - Soft orange for warning states
    '--color-warning-300': '253 173 116', // #FDAD74 - Medium orange for warning states
    '--color-warning-400': '251 149 75', // #FB954B - Vibrant orange for warning states
    '--color-warning-500': '231 120 40', // #E77828 - Base orange for warning states
    '--color-warning-600': '215 108 31', // #D76C1F - Darker orange for warning states
    '--color-warning-700': '180 90 26', // #B45A1A - Deep orange for warning states
    '--color-warning-800': '130 68 23', // #824417 - Dark brown-orange for warning states
    '--color-warning-900': '108 56 19', // #6C3813 - Very dark brown-orange for warning states
    '--color-warning-950': '84 45 18', // #542D12 - Deepest brown-orange for warning states

    /* Info Colors (Shades of blue for informational states) */
    '--color-info-0': '236 248 254', // #ECF8FE - Very light blue for info states
    '--color-info-50': '199 235 252', // #C7EBFC - Light blue for info states
    '--color-info-100': '162 221 250', // #A2DDFA - Pale blue for info states
    '--color-info-200': '124 207 248', // #7CCFF8 - Soft blue for info states
    '--color-info-300': '87 194 246', // #57C2F6 - Medium blue for info states
    '--color-info-400': '50 180 244', // #32B4F4 - Vibrant blue for info states
    '--color-info-500': '13 166 242', // #0DA6F2 - Base blue for info states
    '--color-info-600': '11 141 205', // #0B8DCD - Darker blue for info states
    '--color-info-700': '9 115 168', // #0973A8 - Deep blue for info states
    '--color-info-800': '7 90 131', // #075A83 - Very dark blue for info states
    '--color-info-900': '5 64 93', // #05405D - Darker blue for info states
    '--color-info-950': '3 38 56', // #032638 - Deepest blue for info states

    /* Typography Colors (Shades of gray for text) */
    '--color-typography-0': '254 254 255', // #FEFEFF - Near-white for text
    '--color-typography-50': '245 245 245', // #F5F5F5 - Very light gray for text
    '--color-typography-100': '229 229 229', // #E5E5E5 - Light gray for text
    '--color-typography-200': '219 219 220', // #DBDBDC - Medium-light gray for text
    '--color-typography-300': '212 212 212', // #D4D4D4 - Medium gray for text
    '--color-typography-400': '163 163 163', // #A3A3A3 - Medium-dark gray for text
    '--color-typography-500': '140 140 140', // #8C8C8C - Base gray for text
    '--color-typography-600': '115 115 115', // #737373 - Darker gray for text
    '--color-typography-700': '82 82 82', // #525252 - Deep gray for text
    '--color-typography-800': '64 64 64', // #404040 - Very dark gray for text
    '--color-typography-900': '38 38 39', // #262627 - Near-black for text
    '--color-typography-950': '23 23 23', // #171717 - Deepest black for text

    /* Outline Colors (Shades of gray for borders/outlines) */
    '--color-outline-0': '253 254 254', // #FDFEFE - Near-white for outlines
    '--color-outline-50': '243 243 243', // #F3F3F3 - Very light gray for outlines
    '--color-outline-100': '230 230 230', // #E6E6E6 - Light gray for outlines
    '--color-outline-200': '221 220 219', // #DDDCDB - Medium-light gray for outlines
    '--color-outline-300': '211 211 211', // #D3D3D3 - Medium gray for outlines
    '--color-outline-400': '165 163 163', // #A5A3A3 - Medium-dark gray for outlines
    '--color-outline-500': '140 141 141', // #8C8D8D - Base gray for outlines
    '--color-outline-600': '115 116 116', // #737474 - Darker gray for outlines
    '--color-outline-700': '83 82 82', // #535252 - Deep gray for outlines
    '--color-outline-800': '65 65 65', // #414141 - Very dark gray for outlines
    '--color-outline-900': '39 38 36', // #272624 - Near-black for outlines
    '--color-outline-950': '26 23 23', // #1A1717 - Deepest black for outlines

    /* Background Colors (Shades of gray for backgrounds) */
    '--color-background-0': '255 255 255', // #FFFFFF - Pure white for backgrounds
    '--color-background-50': '246 246 246', // #F6F6F6 - Very light gray for backgrounds
    '--color-background-100': '242 241 241', // #F2F1F1 - Light gray for backgrounds
    '--color-background-200': '220 219 219', // #DCDBDB - Medium-light gray for backgrounds
    '--color-background-300': '213 212 212', // #D5D4D4 - Medium gray for backgrounds
    '--color-background-400': '162 163 163', // #A2A3A3 - Medium-dark gray for backgrounds
    '--color-background-500': '142 142 142', // #8E8E8E - Base gray for backgrounds
    '--color-background-600': '116 116 116', // #747474 - Darker gray for backgrounds
    '--color-background-700': '83 82 82', // #535252 - Deep gray for backgrounds
    '--color-background-800': '65 64 64', // #414040 - Very dark gray for backgrounds
    '--color-background-900': '39 38 37', // #272625 - Near-black for backgrounds
    '--color-background-950': '18 18 18', // #121212 - Deepest black for backgrounds

    /* Background Special Colors (Specific background colors for states) */
    '--color-background-error': '254 241 241', // #FEF1F1 - Light red for error backgrounds
    '--color-background-warning': '255 243 234', // #FFF3EA - Light peach for warning backgrounds
    '--color-background-success': '237 252 242', // #EDFCF2 - Light green for success backgrounds
    '--color-background-muted': '247 248 247', // #F7F8F7 - Light gray for muted backgrounds
    '--color-background-info': '235 248 254', // #EBF8FE - Light blue for info backgrounds

    /* Focus Ring Indicator Colors (Colors for focus rings) */
    '--color-indicator-primary': '55 55 55', // #373737 - Dark gray for primary focus rings
    '--color-indicator-info': '83 153 236', // #5399EC - Medium blue for info focus rings
    '--color-indicator-error': '185 28 28', // #B91C1C - Deep red for error focus rings
  }),
  dark: vars({
    // Primary Colors (Shades of light gray/white for primary elements in dark mode)
    '--color-primary-0': '166 166 166', // #A6A6A6 - Dark gray for primary elements
    '--color-primary-50': '175 175 175', // #AFAFAF - Slightly lighter gray for primary elements
    '--color-primary-100': '186 186 186', // #BABABA - Light gray for primary elements
    '--color-primary-200': '197 197 197', // #C5C5C5 - Medium-light gray for primary elements
    '--color-primary-300': '212 212 212', // #D4D4D4 - Medium gray for primary elements
    '--color-primary-400': '221 221 221', // #DDDDDD - Medium-light gray for primary elements
    '--color-primary-500': '230 230 230', // #E6E6E6 - Base light gray for primary elements
    '--color-primary-600': '240 240 240', // #F0F0F0 - Lighter gray for primary elements
    '--color-primary-700': '250 250 250', // #FAFAFA - Very light gray for primary elements
    '--color-primary-800': '253 253 253', // #FDFDFD - Near-white for primary elements
    '--color-primary-900': '254 249 249', // #FEF9F9 - Almost white for primary elements
    '--color-primary-950': '253 252 252', // #FDFCFC - White for primary elements

    /* Secondary Colors (Shades of dark gray/black for secondary elements in dark mode) */
    '--color-secondary-0': '20 20 20', // #141414 - Deep black for secondary elements
    '--color-secondary-50': '23 23 23', // #171717 - Very dark gray for secondary elements
    '--color-secondary-100': '31 31 31', // #1F1F1F - Dark gray for secondary elements
    '--color-secondary-200': '39 39 39', // #272727 - Slightly lighter dark gray for secondary elements
    '--color-secondary-300': '44 44 44', // #2C2C2C - Medium-dark gray for secondary elements
    '--color-secondary-400': '56 57 57', // #383939 - Medium gray for secondary elements
    '--color-secondary-500': '63 64 64', // #3F4040 - Base medium gray for secondary elements
    '--color-secondary-600': '86 86 86', // #565656 - Slightly lighter gray for secondary elements
    '--color-secondary-700': '110 110 110', // #6E6E6E - Medium-light gray for secondary elements
    '--color-secondary-800': '135 135 135', // #878787 - Lighter gray for secondary elements
    '--color-secondary-900': '150 150 150', // #969696 - Light gray for secondary elements
    '--color-secondary-950': '164 164 164', // #A4A4A4 - Lightest gray for secondary elements

    /* Tertiary Colors (Shades of orange for accents in dark mode, reversed order) */
    '--color-tertiary-0': '84 49 18', // #543112 - Deepest brown-orange for tertiary elements
    '--color-tertiary-50': '108 61 19', // #6C3D13 - Very dark brown-orange for tertiary elements
    '--color-tertiary-100': '130 73 23', // #824917 - Dark brown-orange for tertiary elements
    '--color-tertiary-200': '180 98 26', // #B4621A - Deep orange for tertiary elements
    '--color-tertiary-300': '215 117 31', // #D7751F - Darker orange for tertiary elements
    '--color-tertiary-400': '231 129 40', // #E78128 - Base orange for tertiary elements
    '--color-tertiary-500': '251 157 75', // #FB9D4B - Vibrant orange for tertiary elements
    '--color-tertiary-600': '253 180 116', // #FDB474 - Medium orange for tertiary elements
    '--color-tertiary-700': '254 209 170', // #FED1AA - Soft orange for tertiary elements
    '--color-tertiary-800': '255 233 213', // #FFE9D5 - Pale orange for tertiary elements
    '--color-tertiary-900': '255 242 229', // #FFF2E5 - Light peach for tertiary elements
    '--color-tertiary-950': '255 250 245', // #FFFAF5 - Very light peach for tertiary elements

    /* Error Colors (Shades of red for error states in dark mode, reversed order) */
    '--color-error-0': '83 19 19', // #531313 - Deepest red for error states
    '--color-error-50': '127 29 29', // #7F1D1D - Darker red for error states
    '--color-error-100': '153 27 27', // #991B1B - Very dark red for error states
    '--color-error-200': '185 28 28', // #B91C1C - Deep red for error states
    '--color-error-300': '220 38 38', // #DC2626 - Darker red for error states
    '--color-error-400': '230 53 53', // #E63535 - Base red for error states
    '--color-error-500': '239 68 68', // #EF4444 - Vibrant red for error states
    '--color-error-600': '249 97 96', // #F96160 - Medium red for error states
    '--color-error-700': '229 91 90', // #E55B5A - Soft red for error states
    '--color-error-800': '254 202 202', // #FECACA - Pale red for error states
    '--color-error-900': '254 226 226', // #FEE2E2 - Light red for error states
    '--color-error-950': '254 233 233', // #FEE9E9 - Very light red for error states

    /* Success Colors (Shades of green for success states in dark mode, reversed order) */
    '--color-success-0': '27 50 36', // #1B3224 - Deepest green for success states
    '--color-success-50': '20 83 45', // #14532D - Darker green for success states
    '--color-success-100': '22 101 52', // #166534 - Very dark green for success states
    '--color-success-200': '32 111 62', // #206F3E - Deep green for success states
    '--color-success-300': '42 121 72', // #2A7948 - Darker green for success states
    '--color-success-400': '52 131 82', // #348352 - Base green for success states
    '--color-success-500': '72 151 102', // #489766 - Vibrant green for success states
    '--color-success-600': '102 181 132', // #66B584 - Medium green for success states
    '--color-success-700': '132 211 162', // #84D3A2 - Soft green for success states
    '--color-success-800': '162 241 192', // #A2F1C0 - Pale green for success states
    '--color-success-900': '202 255 232', // #CAFFE8 - Light green for success states
    '--color-success-950': '228 255 244', // #E4FFF4 - Very light green for success states

    /* Warning Colors (Shades of orange for warning states in dark mode, reversed order) */
    '--color-warning-0': '84 45 18', // #542D12 - Deepest brown-orange for warning states
    '--color-warning-50': '108 56 19', // #6C3813 - Very dark brown-orange for warning states
    '--color-warning-100': '130 68 23', // #824417 - Dark brown-orange for warning states
    '--color-warning-200': '180 90 26', // #B45A1A - Deep orange for warning states
    '--color-warning-300': '215 108 31', // #D76C1F - Darker orange for warning states
    '--color-warning-400': '231 120 40', // #E77828 - Base orange for warning states
    '--color-warning-500': '251 149 75', // #FB954B - Vibrant orange for warning states
    '--color-warning-600': '253 173 116', // #FDAD74 - Medium orange for warning states
    '--color-warning-700': '254 205 170', // #FECDAA - Soft orange for warning states
    '--color-warning-800': '255 231 213', // #FFE7D5 - Pale orange for warning states
    '--color-warning-900': '255 244 237', // #FFF4ED - Light peach for warning states
    '--color-warning-950': '255 249 245', // #FFF9F5 - Very light peach for warning states

    /* Info Colors (Shades of blue for informational states in dark mode) */
    '--color-info-0': '3 38 56', // #032638 - Deepest blue for info states
    '--color-info-50': '5 64 93', // #05405D - Darker blue for info states
    '--color-info-100': '7 90 131', // #075A83 - Very dark blue for info states
    '--color-info-200': '9 115 168', // #0973A8 - Deep blue for info states
    '--color-info-300': '11 141 205', // #0B8DCD - Darker blue for info states
    '--color-info-400': '13 166 242', // #0DA6F2 - Base blue for info states
    '--color-info-500': '50 180 244', // #32B4F4 - Vibrant blue for info states
    '--color-info-600': '87 194 246', // #57C2F6 - Medium blue for info states
    '--color-info-700': '124 207 248', // #7CCFF8 - Soft blue for info states
    '--color-info-800': '162 221 250', // #A2DDFA - Pale blue for info states
    '--color-info-900': '199 235 252', // #C7EBFC - Light blue for info states
    '--color-info-950': '236 248 254', // #ECF8FE - Very light blue for info states

    /* Typography Colors (Shades of gray for text in dark mode, reversed order) */
    '--color-typography-0': '23 23 23', // #171717 - Deepest black for text
    '--color-typography-50': '38 38 39', // #262627 - Near-black for text
    '--color-typography-100': '64 64 64', // #404040 - Very dark gray for text
    '--color-typography-200': '82 82 82', // #525252 - Deep gray for text
    '--color-typography-300': '115 115 115', // #737373 - Darker gray for text
    '--color-typography-400': '140 140 140', // #8C8C8C - Base gray for text
    '--color-typography-500': '163 163 163', // #A3A3A3 - Medium-dark gray for text
    '--color-typography-600': '212 212 212', // #D4D4D4 - Medium gray for text
    '--color-typography-700': '219 219 220', // #DBDBDC - Medium-light gray for text
    '--color-typography-800': '229 229 229', // #E5E5E5 - Light gray for text
    '--color-typography-900': '245 245 245', // #F5F5F5 - Very light gray for text
    '--color-typography-950': '254 254 255', // #FEFEFF - Near-white for text

    /* Outline Colors (Shades of gray for borders/outlines in dark mode, reversed order) */
    '--color-outline-0': '26 23 23', // #1A1717 - Deepest black for outlines
    '--color-outline-50': '39 38 36', // #272624 - Near-black for outlines
    '--color-outline-100': '65 65 65', // #414141 - Very dark gray for outlines
    '--color-outline-200': '83 82 82', // #535252 - Deep gray for outlines
    '--color-outline-300': '115 116 116', // #737474 - Darker gray for outlines
    '--color-outline-400': '140 141 141', // #8C8D8D - Base gray for outlines
    '--color-outline-500': '165 163 163', // #A5A3A3 - Medium-dark gray for outlines
    '--color-outline-600': '211 211 211', // #D3D3D3 - Medium gray for outlines
    '--color-outline-700': '221 220 219', // #DDDCDB - Medium-light gray for outlines
    '--color-outline-800': '230 230 230', // #E6E6E6 - Light gray for outlines
    '--color-outline-900': '243 243 243', // #F3F3F3 - Very light gray for outlines
    '--color-outline-950': '253 254 254', // #FDFEFE - Near-white for outlines

    /* Background Colors (Shades of gray for backgrounds in dark mode, reversed order) */
    '--color-background-0': '18 18 18', // #121212 - Deepest black for backgrounds
    '--color-background-50': '39 38 37', // #272625 - Near-black for backgrounds
    '--color-background-100': '65 64 64', // #414040 - Very dark gray for backgrounds
    '--color-background-200': '83 82 82', // #535252 - Deep gray for backgrounds
    '--color-background-300': '116 116 116', // #747474 - Darker gray for backgrounds
    '--color-background-400': '142 142 142', // #8E8E8E - Base gray for backgrounds
    '--color-background-500': '162 163 163', // #A2A3A3 - Medium-dark gray for backgrounds
    '--color-background-600': '213 212 212', // #D5D4D4 - Medium gray for backgrounds
    '--color-background-700': '229 228 228', // #E5E4E4 - Medium-light gray for backgrounds
    '--color-background-800': '242 241 241', // #F2F1F1 - Light gray for backgrounds
    '--color-background-900': '246 246 246', // #F6F6F6 - Very light gray for backgrounds
    '--color-background-950': '255 255 255', // #FFFFFF - Pure white for backgrounds

    /* Background Special Colors (Specific background colors for states in dark mode) */
    '--color-background-error': '66 43 43', // #422B2B - Dark red for error backgrounds
    '--color-background-warning': '65 47 35', // #412F23 - Dark brown-orange for warning backgrounds
    '--color-background-success': '28 43 33', // #1C2B21 - Dark green for success backgrounds
    '--color-background-muted': '51 51 51', // #333333 - Dark gray for muted backgrounds
    '--color-background-info': '26 40 46', // #1A282E - Dark blue for info backgrounds

    /* Focus Ring Indicator Colors (Colors for focus rings in dark mode) */
    '--color-indicator-primary': '247 247 247', // #F7F7F7 - Light gray for primary focus rings
    '--color-indicator-info': '161 199 245', // #A1C7F5 - Light blue for info focus rings
    '--color-indicator-error': '232 70 69', // #E84645 - Bright red for error focus rings
  }),
};