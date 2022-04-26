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

export const transformGoogleBounds = (bounds: google.maps.LatLngBounds & {
  zb?: {
    h: number;
    j: number;
  }
  Ua?: {
    h: number;
    j: number;
  }
}): Bounds => {
  return {
    lat: {
      lower: bounds.zb?.h ?? bounds.getSouthWest().lat(),
      upper: bounds.zb?.j ?? bounds.getNorthEast().lat(),
    },
    lng: {
      lower: bounds.Ua?.h ?? bounds.getSouthWest().lng(),
      upper: bounds.Ua?.j ?? bounds.getNorthEast().lng(),
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
