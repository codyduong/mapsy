export type GooglePlacesAutocompleteHandle = {
  getSessionToken: () =>
    | google.maps.places.AutocompleteSessionToken
    | undefined;
  refreshSessionToken: () => void;
};

export interface LatLng {
  lat: number;
  lng: number;
}

export interface AutocompletionRequest {
  bounds?: [LatLng, LatLng];
  componentRestrictions?: { country: string | string[] };
  location?: LatLng;
  offset?: number;
  radius?: number;
  types?: string[];
}

export default function autoCompleteReqBuilder(
  autocompletionRequest: AutocompletionRequest,
  input: string,
  sessionToken?: google.maps.places.AutocompleteSessionToken
): google.maps.places.AutocompletionRequest {
  const { bounds, location, ...rest } = autocompletionRequest;

  const res: google.maps.places.AutocompletionRequest = {
    input,
    ...rest,
  };

  if (sessionToken) {
    res.sessionToken = sessionToken;
  }

  if (bounds) {
    res.bounds = new google.maps.LatLngBounds(...bounds);
  }

  if (location) {
    res.location = new google.maps.LatLng(location);
  }

  return res;
}
