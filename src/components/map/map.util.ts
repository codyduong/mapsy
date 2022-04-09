export type Bounds = {
  lat: {
    lower: number
    upper: number
  },
  lng: {
    lower: number
    upper: number
  }
}

export const transformGoogleBounds = (bounds: any): Bounds => {
    return {
        lat: {
            lower: bounds.zb.h,
            upper: bounds.zb.j,
        },
        lng: {
            lower: bounds.Ua.h,
            upper: bounds.Ua.j,
        }
    };
};