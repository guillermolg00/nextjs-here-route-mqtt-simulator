export interface AutocompleteResponseDto {
  items: AutocompleteResponseItemDto[];
}

export interface AutocompleteResponseItemDto {
  address: AddressDto;
  id: string;
  title: string;
}

export interface AddressDto {
    city: string;
    countryCode: string;
    countryName: string;
    county: string;
    houseNumber: string;
    postalCode: string;
    state: string;
    stateCode: string;
    street: string;
    label: string;
}

export interface CalculateRouteResultDto {
  routes: {
    sections: {
      polyline: string;
      departure: {
        place: {
          location: H.geo.IPoint;
        };
      };
      arrival: {
        place: {
          location: H.geo.IPoint;
        };
      };
      summary: {
        baseDuration: number;
        duration: number;
        length: number;
      }
    }[];
  }[];
  [key: string]: unknown;
}


export interface GeoCodeResponseDto {
  response: {
    view: {
      // incomplete dto
      result: unknown
    }[]
  }
}

export interface AutosuggestResponseDto {
  items: AutosuggestItemDto[]
}

export interface AutosuggestItemDto {
  title: string
  id: string
  resultType: string
  address: AddressDto
  position: PositionDto
}


export interface PositionDto {
  lat: number
  lng: number
}
