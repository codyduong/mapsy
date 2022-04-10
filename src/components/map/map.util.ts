export type Bounds = {
  lat: {
    lower: number;
    upper: number;
  };
  lng: {
    lower: number;
    upper: number;
  };
};

export type LatLng = {
  lat: number;
  lng: number;
};

export const transformGoogleBounds = (bounds: any): Bounds => {
  return {
    lat: {
      lower: bounds.zb.h,
      upper: bounds.zb.j,
    },
    lng: {
      lower: bounds.Ua.h,
      upper: bounds.Ua.j,
    },
  };
};

export function transformLatLngToPoint(
  LatLng: google.maps.LatLng,
  map: google.maps.Map
) {
  const topRight = map
    .getProjection()
    ?.fromLatLngToPoint(map.getBounds()!.getNorthEast()!);
  const bottomLeft = map
    .getProjection()
    ?.fromLatLngToPoint(map.getBounds()!.getSouthWest()!);
  const scale = Math.pow(2, map.getZoom()!);
  const worldPoint = map.getProjection()?.fromLatLngToPoint(LatLng);
  return new google.maps.Point(
    (worldPoint!.x - bottomLeft!.x) * scale,
    (worldPoint!.y - topRight!.y) * scale
  );
}
