import { AutocompleteResponseDto, AutosuggestResponseDto, GeoCodeResponseDto, PositionDto } from "./here.dto"

export interface HereServiceConfig {
  apiKey: string
  appId: string
}

export class HereService {
  private config!: HereServiceConfig

  static initialize(config: HereServiceConfig) {
    const service = new HereService()
    service.config = config
    return service;
  }

  checkInitialized() {
    if (!this.config) throw new Error('HereService not initialized')
  }

  async autocomplete(query: string): Promise<AutocompleteResponseDto> {
    this.checkInitialized();

    const url = new URL('https://autocomplete.search.hereapi.com/v1/autocomplete');
    url.searchParams.append('q', query);
    url.searchParams.append('apiKey', this.config.apiKey);
    url.searchParams.append('in', 'countryCode:USA');
    const res = await fetch(
      url.toString(),
    )

    return res.json()
  }

  async autosuggest(query: string, at: PositionDto): Promise<AutosuggestResponseDto> {
    this.checkInitialized();

    const url = new URL('https://autosuggest.search.hereapi.com/v1/autosuggest');
    url.searchParams.append('q', query);
    url.searchParams.append('apiKey', this.config.apiKey);
    url.searchParams.append('in', 'countryCode:USA');
    url.searchParams.append('at', `${at.lat},${at.lng}`);
    url.searchParams.append('limit', '5');
    const res = await fetch(
      url.toString(),
    )

    return res.json()
  }

  async geoCode(locationId: string): Promise<GeoCodeResponseDto> {
    this.checkInitialized()

    const url = new URL('https://geocoder.ls.hereapi.com/6.2/geocode.json');
    url.searchParams.append('locationid', locationId);
    url.searchParams.append('apiKey', this.config.apiKey);
    url.searchParams.append('jsonattributes', '1');
    url.searchParams.append('gen', '9');

    const res = await fetch(url.toString())

    return res.json()
  }

  get apikey() {
    return this.config.apiKey
  }

  formatAddress(label?: string): string {
    if (!label) return ''
    return label.split(',').reduce((acc, cur) => {
      if (cur.trim() === 'United States') return acc;

      if (cur.trim().match(/.{2} (?<!\d)\d{5}(?:[ -]\d{4})?\b/)) {
        return acc
      }

      return acc + (acc ? ', ' : '') + cur.trim()
    }, '')
  }
}
