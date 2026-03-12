import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type UnitSystem = 'metric' | 'imperial'

type GeoResult = {
  id?: number
  name: string
  country?: string
  admin1?: string
  latitude: number
  longitude: number
  timezone?: string
}

type ForecastResponse = {
  timezone: string
  current: {
    time: string
    temperature_2m: number
    relative_humidity_2m: number
    apparent_temperature: number
    is_day: number
    precipitation: number
    weather_code: number
    wind_speed_10m: number
    wind_direction_10m: number
    surface_pressure: number
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    precipitation_probability: number[]
    weather_code: number[]
    relative_humidity_2m: number[]
  }
  daily: {
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    sunrise: string[]
    sunset: string[]
    uv_index_max: number[]
    precipitation_sum: number[]
  }
}

type AirQualityResponse = {
  current: {
    us_aqi: number
    pm2_5: number
    pm10: number
    ozone: number
    carbon_monoxide: number
    nitrogen_dioxide: number
    sulphur_dioxide: number
  }
}

type WeatherBundle = {
  location: GeoResult
  forecast: ForecastResponse
  air: AirQualityResponse
}

type HourlyPoint = {
  time: string
  temp: number
  rainChance: number
  weatherCode: number
  humidity: number
}

type MapOverlay = 'rain' | 'wind' | 'temp'
type MapPalette = 'colorblind' | 'high-contrast' | 'grayscale'
type ContrastTarget = 'AA' | 'AAA'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

const WEATHER_CODE_LABELS: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Rain showers',
  81: 'Moderate showers',
  82: 'Violent showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Severe thunderstorm with hail',
}

const WEATHER_CODE_ICON: Record<number, string> = {
  0: '??',
  1: '???',
  2: '?',
  3: '??',
  45: '???',
  48: '???',
  51: '???',
  53: '???',
  55: '???',
  56: '???',
  57: '???',
  61: '???',
  63: '???',
  65: '???',
  66: '???',
  67: '???',
  71: '???',
  73: '??',
  75: '??',
  77: '???',
  80: '???',
  81: '???',
  82: '??',
  85: '???',
  86: '??',
  95: '??',
  96: '??',
  99: '???',
}

const RECENT_CITY_KEY = 'advanced-weather-recent-cities'

const formatLocation = (place: GeoResult): string => {
  const area = [place.name, place.admin1, place.country].filter(Boolean)
  return area.join(', ')
}

const weatherLabel = (code: number): string => WEATHER_CODE_LABELS[code] ?? 'Unknown conditions'
const weatherIcon = (code: number): string => WEATHER_CODE_ICON[code] ?? '???'

const cToF = (celsius: number): number => (celsius * 9) / 5 + 32
const kmhToMph = (kmh: number): number => kmh * 0.621371

const formatTemp = (celsius: number, units: UnitSystem): string => {
  const value = units === 'imperial' ? cToF(celsius) : celsius
  const symbol = units === 'imperial' ? '°F' : '°C'
  return `${Math.round(value)}${symbol}`
}

const formatWind = (kmh: number, units: UnitSystem): string => {
  const value = units === 'imperial' ? kmhToMph(kmh) : kmh
  const symbol = units === 'imperial' ? 'mph' : 'km/h'
  return `${Math.round(value)} ${symbol}`
}

const aqiCategory = (aqi: number): string => {
  if (aqi <= 50) return 'Good'
  if (aqi <= 100) return 'Moderate'
  if (aqi <= 150) return 'Unhealthy for sensitive groups'
  if (aqi <= 200) return 'Unhealthy'
  if (aqi <= 300) return 'Very unhealthy'
  return 'Hazardous'
}

const timeLabel = (isoLike: string): string =>
  new Date(isoLike).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

const dayLabel = (isoDate: string): string =>
  new Date(isoDate).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })

const toMinutes = (dateLike: string): number => {
  const date = new Date(dateLike)
  return date.getHours() * 60 + date.getMinutes()
}

const clamp = (value: number, min = 0, max = 1): number => Math.max(min, Math.min(max, value))

const hexToRgb = (hex: string): [number, number, number] => {
  const normalized = hex.replace('#', '')
  const expanded =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : normalized
  const int = Number.parseInt(expanded, 16)
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255]
}

const relativeLuminance = (hex: string): number => {
  const [r, g, b] = hexToRgb(hex).map((channel) => {
    const sRGB = channel / 255
    return sRGB <= 0.03928 ? sRGB / 12.92 : ((sRGB + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

const contrastRatio = (hexA: string, hexB: string): number => {
  const l1 = relativeLuminance(hexA)
  const l2 = relativeLuminance(hexB)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

function App() {
  const [query, setQuery] = useState('')
  const [units, setUnits] = useState<UnitSystem>('metric')
  const [mapOverlay, setMapOverlay] = useState<MapOverlay>('rain')
  const [mapPalette, setMapPalette] = useState<MapPalette>('colorblind')
  const [contrastTarget, setContrastTarget] = useState<ContrastTarget>('AA')
  const [bundle, setBundle] = useState<WeatherBundle | null>(null)
  const [suggestions, setSuggestions] = useState<GeoResult[]>([])
  const [recentCities, setRecentCities] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [locating, setLocating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(RECENT_CITY_KEY)
    if (saved) {
      try {
        const parsed: unknown = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setRecentCities(parsed.filter((v): v is string => typeof v === 'string').slice(0, 5))
        }
      } catch {
        localStorage.removeItem(RECENT_CITY_KEY)
      }
    }
  }, [])

  useEffect(() => {
    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      setDeferredPrompt(event as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
  }, [])

  const hourlyPreview = useMemo<HourlyPoint[]>(() => {
    if (!bundle) return []
    return bundle.forecast.hourly.time.slice(0, 12).map((time, index) => ({
      time,
      temp: bundle.forecast.hourly.temperature_2m[index],
      rainChance: bundle.forecast.hourly.precipitation_probability[index],
      weatherCode: bundle.forecast.hourly.weather_code[index],
      humidity: bundle.forecast.hourly.relative_humidity_2m[index],
    }))
  }, [bundle])

  const uvPath = useMemo(() => {
    if (!bundle) return ''
    const values = bundle.forecast.daily.uv_index_max
    const maxVal = Math.max(1, ...values)
    return values
      .map((value, index) => {
        const x = (index / Math.max(1, values.length - 1)) * 100
        const y = 100 - (value / maxVal) * 100
        return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
      })
      .join(' ')
  }, [bundle])

  const severeSignals = useMemo(() => {
    if (!bundle) return []
    const alerts: string[] = []
    const maxRainChance = Math.max(...bundle.forecast.hourly.precipitation_probability.slice(0, 24))
    const maxWind = Math.max(bundle.forecast.current.wind_speed_10m, ...bundle.forecast.hourly.temperature_2m.map(() => bundle.forecast.current.wind_speed_10m))
    const hasThunder = bundle.forecast.daily.weather_code.some((code) => [95, 96, 99].includes(code))
    const maxUv = Math.max(...bundle.forecast.daily.uv_index_max)
    const heatPeak = Math.max(...bundle.forecast.daily.temperature_2m_max)
    const minTemp = Math.min(...bundle.forecast.daily.temperature_2m_min)

    if (hasThunder) alerts.push('Thunderstorm risk detected in the weekly model.')
    if (maxRainChance >= 75) alerts.push('High precipitation probability in the next 24 hours.')
    if (maxWind >= 45) alerts.push('Strong wind conditions expected. Secure outdoor items.')
    if (maxUv >= 8) alerts.push('Very high UV expected. Use sun protection midday.')
    if (heatPeak >= 35) alerts.push('Heat stress risk in upcoming afternoons.')
    if (minTemp <= -5) alerts.push('Sub-freezing temperatures expected overnight.')
    if (bundle.air.current.us_aqi > 100) alerts.push('Air quality is unhealthy for sensitive groups or worse.')

    return alerts
  }, [bundle])

  const sunProgress = useMemo(() => {
    if (!bundle) return 0
    const now = toMinutes(bundle.forecast.current.time)
    const sunrise = toMinutes(bundle.forecast.daily.sunrise[0])
    const sunset = toMinutes(bundle.forecast.daily.sunset[0])
    if (sunset <= sunrise) return 0
    return clamp((now - sunrise) / (sunset - sunrise))
  }, [bundle])

  const radarUrl = useMemo(() => {
    if (!bundle) return ''
    const { latitude, longitude } = bundle.location
    return `https://embed.windy.com/embed2.html?lat=${latitude}&lon=${longitude}&zoom=6&level=surface&overlay=${mapOverlay}&product=radar&menu=&message=&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&detailLat=${latitude}&detailLon=${longitude}&metricWind=default&metricTemp=default&radarRange=-1`
  }, [bundle, mapOverlay])

  const mapLegend = useMemo(() => {
    if (mapPalette === 'high-contrast') {
      return [
        { color: '#005A9C', label: 'Low', meaning: 'Low intensity or weak signal' },
        { color: '#107C10', label: 'Medium', meaning: 'Moderate intensity' },
        { color: '#C239B3', label: 'High', meaning: 'High intensity' },
        { color: '#8A1C1C', label: 'Extreme', meaning: 'Extreme intensity or severe areas' },
      ]
    }

    if (mapPalette === 'grayscale') {
      return [
        { color: '#D9D9D9', label: 'Low', meaning: 'Low intensity or weak signal' },
        { color: '#A6A6A6', label: 'Medium', meaning: 'Moderate intensity' },
        { color: '#737373', label: 'High', meaning: 'High intensity' },
        { color: '#262626', label: 'Extreme', meaning: 'Extreme intensity or severe areas' },
      ]
    }

    return [
      { color: '#0072B2', label: 'Low', meaning: 'Low intensity or weak signal' },
      { color: '#56B4E9', label: 'Medium', meaning: 'Moderate intensity' },
      { color: '#E69F00', label: 'High', meaning: 'High intensity' },
      { color: '#D55E00', label: 'Extreme', meaning: 'Extreme intensity or severe areas' },
    ]
  }, [mapPalette])

  const mapContrastResults = useMemo(() => {
    const legendBackground = '#f7f9ff'
    const threshold = contrastTarget === 'AAA' ? 7 : 4.5
    return mapLegend.map((item) => {
      const ratio = contrastRatio(item.color, legendBackground)
      const passesTarget = ratio >= threshold
      return {
        ...item,
        ratio,
        passesTarget,
      }
    })
  }, [contrastTarget, mapLegend])

  const contrastPassCount = useMemo(
    () => mapContrastResults.filter((result) => result.passesTarget).length,
    [mapContrastResults],
  )

  const upsertRecentCity = (name: string) => {
    setRecentCities((prev) => {
      const next = [name, ...prev.filter((city) => city.toLowerCase() !== name.toLowerCase())].slice(0, 5)
      localStorage.setItem(RECENT_CITY_KEY, JSON.stringify(next))
      return next
    })
  }

  const searchCity = async (cityName: string, count = 5): Promise<GeoResult[]> => {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=${count}&language=en&format=json`,
    )
    if (!response.ok) {
      throw new Error('Could not reach geocoding service')
    }
    const data = (await response.json()) as { results?: GeoResult[] }
    return data.results ?? []
  }

  const loadWeatherForPlace = async (place: GeoResult) => {
    setError(null)
    setLoading(true)
    try {
      const forecastUrl =
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
        '&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure' +
        '&hourly=temperature_2m,precipitation_probability,weather_code,relative_humidity_2m' +
        '&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum' +
        '&timezone=auto&forecast_days=7'

      const airUrl =
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${place.latitude}&longitude=${place.longitude}` +
        '&current=us_aqi,pm2_5,pm10,ozone,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide&timezone=auto'

      const [forecastRes, airRes] = await Promise.all([fetch(forecastUrl), fetch(airUrl)])

      if (!forecastRes.ok) {
        throw new Error('Forecast data is unavailable for this location')
      }
      if (!airRes.ok) {
        throw new Error('Air quality data is unavailable right now')
      }

      const forecast = (await forecastRes.json()) as ForecastResponse
      const air = (await airRes.json()) as AirQualityResponse

      setBundle({ location: place, forecast, air })
      setSuggestions([])
      upsertRecentCity(place.name)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error while loading weather')
    } finally {
      setLoading(false)
    }
  }

  const searchAndLoad = async (cityName: string) => {
    if (!cityName.trim()) {
      setError('Enter a city name to search')
      return
    }

    setError(null)
    setLoading(true)
    try {
      const places = await searchCity(cityName.trim(), 6)
      if (places.length === 0) {
        setError('No matching cities found')
        setSuggestions([])
        setBundle(null)
        return
      }

      setSuggestions(places)
      await loadWeatherForPlace(places[0])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await searchAndLoad(query)
  }

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported in this browser')
      return
    }
    setError(null)
    setLocating(true)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const place: GeoResult = {
          name: 'Your location',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
        await loadWeatherForPlace(place)
        setLocating(false)
      },
      () => {
        setError('Could not read your location. Check browser location permissions.')
        setLocating(false)
      },
      { timeout: 10000, enableHighAccuracy: true },
    )
  }

  const installApp = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <p className="eyebrow">Hyperlocal Intelligence</p>
        <h1>Nimbus One</h1>
        <p className="subtitle">
          Real-time weather, air quality, UV, and 7-day planning in one privacy-safe dashboard.
        </p>
      </header>

      <section className="control-panel">
        <form className="search-row" onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city, airport, or district"
            aria-label="Search location"
          />
          <button type="submit" disabled={loading || locating}>
            {loading ? 'Searching...' : 'Search'}
          </button>
          <button type="button" className="secondary" onClick={useMyLocation} disabled={loading || locating}>
            {locating ? 'Locating...' : 'Use my location'}
          </button>
          {deferredPrompt && (
            <button type="button" className="install-btn" onClick={() => void installApp()}>
              Install App
            </button>
          )}
        </form>

        <div className="toggle-row">
          <span>Units:</span>
          <button
            type="button"
            className={units === 'metric' ? 'chip active' : 'chip'}
            onClick={() => setUnits('metric')}
          >
            Metric
          </button>
          <button
            type="button"
            className={units === 'imperial' ? 'chip active' : 'chip'}
            onClick={() => setUnits('imperial')}
          >
            Imperial
          </button>
        </div>

        {recentCities.length > 0 && (
          <div className="recent-row">
            <span>Recent:</span>
            {recentCities.map((city) => (
              <button
                key={city}
                type="button"
                className="recent-chip"
                onClick={() => {
                  setQuery(city)
                  void searchAndLoad(city)
                }}
              >
                {city}
              </button>
            ))}
          </div>
        )}

        {error && <p className="error-text">{error}</p>}
      </section>

      {bundle && (
        <main className="dashboard">
          <section className="card now-card">
            <div className="now-left">
              <h2>{formatLocation(bundle.location)}</h2>
              <p className="condition">
                <span>{weatherIcon(bundle.forecast.current.weather_code)}</span>
                {weatherLabel(bundle.forecast.current.weather_code)}
              </p>
              <p className="big-temp">{formatTemp(bundle.forecast.current.temperature_2m, units)}</p>
              <p className="feels-like">
                Feels like {formatTemp(bundle.forecast.current.apparent_temperature, units)}
              </p>
            </div>
            <div className="now-right">
              <p>Humidity: {bundle.forecast.current.relative_humidity_2m}%</p>
              <p>Wind: {formatWind(bundle.forecast.current.wind_speed_10m, units)}</p>
              <p>Pressure: {Math.round(bundle.forecast.current.surface_pressure)} hPa</p>
              <p>Precipitation: {bundle.forecast.current.precipitation.toFixed(1)} mm</p>
              <p>Sunrise: {timeLabel(bundle.forecast.daily.sunrise[0])}</p>
              <p>Sunset: {timeLabel(bundle.forecast.daily.sunset[0])}</p>
              <p>Timezone: {bundle.forecast.timezone}</p>
            </div>
          </section>

          <section className="card severe-card">
            <h3>Severe Weather Signals</h3>
            {severeSignals.length === 0 ? (
              <p>No high-risk signals detected in the current model window.</p>
            ) : (
              <ul>
                {severeSignals.map((signal) => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
            )}
          </section>

          <section className="card sun-card">
            <h3>Sun Arc and UV Trend</h3>
            <div className="sun-track">
              <div className="sun-orbit" />
              <div className="sun-dot" style={{ left: `${sunProgress * 100}%` }}>
                ??
              </div>
            </div>
            <p>Daylight progress: {Math.round(sunProgress * 100)}%</p>
            <svg viewBox="0 0 100 100" className="uv-chart" aria-label="UV trend chart">
              <path d={uvPath} fill="none" stroke="#0e7c86" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <p>UV max this week: {Math.max(...bundle.forecast.daily.uv_index_max).toFixed(1)}</p>
          </section>

          <section className={`card radar-card map-palette-${mapPalette}`}>
            <h3>Live Radar Layer</h3>
            <p className="map-help-text" id="mapHelpText">
              Accessibility mode uses a colorblind-safe legend and text labels. Switch overlays to compare rain,
              wind, and temperature patterns.
            </p>

            <div className="map-controls" aria-label="Map controls">
              <fieldset>
                <legend>Overlay</legend>
                <label>
                  <input
                    type="radio"
                    name="mapOverlay"
                    checked={mapOverlay === 'rain'}
                    onChange={() => setMapOverlay('rain')}
                  />
                  Rain
                </label>
                <label>
                  <input
                    type="radio"
                    name="mapOverlay"
                    checked={mapOverlay === 'wind'}
                    onChange={() => setMapOverlay('wind')}
                  />
                  Wind
                </label>
                <label>
                  <input
                    type="radio"
                    name="mapOverlay"
                    checked={mapOverlay === 'temp'}
                    onChange={() => setMapOverlay('temp')}
                  />
                  Temperature
                </label>
              </fieldset>

              <fieldset>
                <legend>Palette</legend>
                <label>
                  <input
                    type="radio"
                    name="mapPalette"
                    checked={mapPalette === 'colorblind'}
                    onChange={() => setMapPalette('colorblind')}
                  />
                  Colorblind safe
                </label>
                <label>
                  <input
                    type="radio"
                    name="mapPalette"
                    checked={mapPalette === 'high-contrast'}
                    onChange={() => setMapPalette('high-contrast')}
                  />
                  High contrast
                </label>
                <label>
                  <input
                    type="radio"
                    name="mapPalette"
                    checked={mapPalette === 'grayscale'}
                    onChange={() => setMapPalette('grayscale')}
                  />
                  Grayscale
                </label>
              </fieldset>
            </div>

            <ul className="map-legend" aria-label="Map intensity legend">
              {mapLegend.map((item) => (
                <li key={item.label + item.color}>
                  <span className="swatch" style={{ backgroundColor: item.color }} aria-hidden="true" />
                  <span className="legend-label">{item.label}:</span> {item.meaning}
                </li>
              ))}
            </ul>

            <div className="contrast-panel" role="status" aria-live="polite" aria-label="WCAG contrast checks">
              <h4>WCAG 2.2 Contrast Check</h4>
              <p>Checks compare each legend color against the legend tile background.</p>
              <div className="contrast-target-row" role="group" aria-label="Contrast compliance target">
                <span>Target:</span>
                <label>
                  <input
                    type="radio"
                    name="contrastTarget"
                    checked={contrastTarget === 'AA'}
                    onChange={() => setContrastTarget('AA')}
                  />
                  AA (4.5:1)
                </label>
                <label>
                  <input
                    type="radio"
                    name="contrastTarget"
                    checked={contrastTarget === 'AAA'}
                    onChange={() => setContrastTarget('AAA')}
                  />
                  AAA (7:1)
                </label>
              </div>
              <p className="contrast-summary">
                Passed {contrastPassCount} of {mapContrastResults.length} at {contrastTarget}.
              </p>
              <ul>
                {mapContrastResults.map((result) => (
                  <li key={`contrast-${result.label}-${result.color}`}>
                    <span className={`contrast-badge ${result.passesTarget ? 'pass' : 'fail'}`}>
                      {result.passesTarget ? 'Pass' : 'Fail'}
                    </span>
                    <span>
                      {result.label}: {result.ratio.toFixed(2)}:1
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <iframe
              title={`Weather map for ${formatLocation(bundle.location)} showing ${mapOverlay} overlay`}
              src={radarUrl}
              className="radar-frame"
              loading="lazy"
              aria-describedby="mapHelpText"
            />
          </section>

          <section className="card">
            <h3>Next 12 hours</h3>
            <div className="hour-grid">
              {hourlyPreview.map((hour) => (
                <div key={hour.time} className="hour-item">
                  <p>{timeLabel(hour.time)}</p>
                  <p>{weatherIcon(hour.weatherCode)}</p>
                  <p>{formatTemp(hour.temp, units)}</p>
                  <p>{hour.rainChance}% rain</p>
                  <p>{hour.humidity}% RH</p>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h3>7-day outlook</h3>
            <div className="day-grid">
              {bundle.forecast.daily.time.map((day, index) => (
                <div key={day} className="day-item">
                  <p>{dayLabel(day)}</p>
                  <p>{weatherIcon(bundle.forecast.daily.weather_code[index])}</p>
                  <p>{weatherLabel(bundle.forecast.daily.weather_code[index])}</p>
                  <p>
                    {formatTemp(bundle.forecast.daily.temperature_2m_max[index], units)} /{' '}
                    {formatTemp(bundle.forecast.daily.temperature_2m_min[index], units)}
                  </p>
                  <p>UV max: {bundle.forecast.daily.uv_index_max[index].toFixed(1)}</p>
                  <p>Rain: {bundle.forecast.daily.precipitation_sum[index].toFixed(1)} mm</p>
                </div>
              ))}
            </div>
          </section>

          <section className="card air-card">
            <h3>Air quality</h3>
            <p className="aqi-score">
              US AQI {Math.round(bundle.air.current.us_aqi)} · {aqiCategory(bundle.air.current.us_aqi)}
            </p>
            <div className="air-grid">
              <p>PM2.5: {bundle.air.current.pm2_5.toFixed(1)} µg/m³</p>
              <p>PM10: {bundle.air.current.pm10.toFixed(1)} µg/m³</p>
              <p>Ozone: {bundle.air.current.ozone.toFixed(1)} µg/m³</p>
              <p>NO2: {bundle.air.current.nitrogen_dioxide.toFixed(1)} µg/m³</p>
              <p>SO2: {bundle.air.current.sulphur_dioxide.toFixed(1)} µg/m³</p>
              <p>CO: {bundle.air.current.carbon_monoxide.toFixed(1)} µg/m³</p>
            </div>
          </section>

          {suggestions.length > 1 && (
            <section className="card">
              <h3>Other matching places</h3>
              <div className="suggestion-grid">
                {suggestions.slice(1).map((place) => (
                  <button
                    key={`${place.latitude}-${place.longitude}-${place.id ?? place.name}`}
                    className="suggestion"
                    type="button"
                    onClick={() => void loadWeatherForPlace(place)}
                  >
                    {formatLocation(place)}
                  </button>
                ))}
              </div>
            </section>
          )}
        </main>
      )}

      {!bundle && !loading && !error && (
        <section className="empty-state">
          <p>Search a place to load your weather intelligence cockpit.</p>
        </section>
      )}
    </div>
  )
}

export default App

