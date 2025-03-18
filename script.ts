api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={}
{
    api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={}
    {
        {
            "cod": "200",
            "message": 0,
            "cnt": 40,
            "list": [
              {
                "dt": 1661871600,
                "main": {
                  "temp": 296.76,
                  "feels_like": 296.98,
                  "temp_min": 296.76,
                  "temp_max": 297.87,
                  "pressure": 1015,
                  "sea_level": 1015,
                  "grnd_level": 933,
                  "humidity": 69,
                  "temp_kf": -1.11
                },
                "weather": [
                  {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                  }
                ],
                "clouds": {
                  "all": 100
                },
                "wind": {
                  "speed": 0.62,
                  "deg": 349,
                  "gust": 1.18
                },
                "visibility": 10000,
                "pop": 0.32,
                "rain": {
                  "3h": 0.26
                },
                "sys": {
                  "pod": "d"
                },
                "dt_txt": "2022-08-30 15:00:00"
              },
              {
                "dt": 1661882400,
                "main": {
                  "temp": 295.45,
                  "feels_like": 295.59,
                  "temp_min": 292.84,
                  "temp_max": 295.45,
                  "pressure": 1015,
                  "sea_level": 1015,
                  "grnd_level": 931,
                  "humidity": 71,
                  "temp_kf": 2.61
                },
                "weather": [
                  {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                  }
                ],
                "clouds": {
                  "all": 96
                },
                "wind": {
                  "speed": 1.97,
                  "deg": 157,
                  "gust": 3.39
                },
                "visibility": 10000,
                "pop": 0.33,
                "rain": {
                  "3h": 0.57
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2022-08-30 18:00:00"
              },
              {
                "dt": 1661893200,
                "main": {
                  "temp": 292.46,
                  "feels_like": 292.54,
                  "temp_min": 290.31,
                  "temp_max": 292.46,
                  "pressure": 1015,
                  "sea_level": 1015,
                  "grnd_level": 931,
                  "humidity": 80,
                  "temp_kf": 2.15
                },
                "weather": [
                  {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                  }
                ],
                "clouds": {
                  "all": 68
                },
                "wind": {
                  "speed": 2.66,
                  "deg": 210,
                  "gust": 3.58
                },
                "visibility": 10000,
                "pop": 0.7,
                "rain": {
                  "3h": 0.49
                },
                "sys": {
                  "pod": "n"
                },
                "dt_txt": "2022-08-30 21:00:00"
              },
              ....
              {
                "dt": 1662292800,
                "main": {
                  "temp": 294.93,
                  "feels_like": 294.83,
                  "temp_min": 294.93,
                  "temp_max": 294.93,
                  "pressure": 1018,
                  "sea_level": 1018,
                  "grnd_level": 935,
                  "humidity": 64,
                  "temp_kf": 0
                },
                "weather": [
                  {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                  }
                ],
                "clouds": {
                  "all": 88
                },
                "wind": {
                  "speed": 1.14,
                  "deg": 17,
                  "gust": 1.57
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                  "pod": "d"
                },
                "dt_txt": "2022-09-04 12:00:00"
              }
            ],
            "city": {
              "id": 3163858,
              "name": "Zocca",
              "coord": {
                "lat": 44.34,
                "lon": 10.99
              },
              "country": "IT",
              "population": 4593,
              "timezone": 7200,
              "sunrise": 1661834187,
              "sunset": 1661882248
            }
          }
          <weatherdata>
          <location>
          <name>Zocca</name>
          <type/>
          <country>IT</country>
          <timezone>7200</timezone>
          <location altitude="0" latitude="44.34" longitude="10.99" geobase="geonames" geobaseid="3163858"/>
          </location>
          <credit/>
          <meta>
          <lastupdate/>
          <calctime>0</calctime>
          <nextupdate/>
          </meta>
          <sun rise="2022-08-30T04:36:27" set="2022-08-30T17:57:28"/>
          <forecast>
          <time from="2022-08-30T12:00:00" to="2022-08-30T15:00:00">
          <symbol number="500" name="light rain" var="10d"/>
          <precipitation probability="0.32" unit="3h" value="0.26" type="rain"/>
          <windDirection deg="349" code="N" name="North"/>
          <windSpeed mps="0.62" unit="m/s" name="Calm"/>
          <windGust gust="1.18" unit="m/s"/>
          <temperature unit="kelvin" value="298.08" min="297.87" max="298.08"/>
          <feels_like value="298.01" unit="kelvin"/>
          <pressure unit="hPa" value="1015"/>
          <humidity value="53" unit="%"/>
          <clouds value="overcast clouds" all="100" unit="%"/>
          <visibility value="10000"/>
          </time>
          <time from="2022-08-30T15:00:00" to="2022-08-30T18:00:00">
          <symbol number="500" name="light rain" var="10n"/>
          <precipitation probability="0.33" unit="3h" value="0.57" type="rain"/>
          <windDirection deg="157" code="SSE" name="South-southeast"/>
          <windSpeed mps="1.97" unit="m/s" name="Light breeze"/>
          <windGust gust="3.39" unit="m/s"/>
          <temperature unit="kelvin" value="296.33" min="292.84" max="296.33"/>
          <feels_like value="296.27" unit="kelvin"/>
          <pressure unit="hPa" value="1015"/>
          <humidity value="60" unit="%"/>
          <clouds value="overcast clouds" all="96" unit="%"/>
          <visibility value="10000"/>
          </time>
          <time from="2022-08-30T18:00:00" to="2022-08-30T21:00:00">
          <symbol number="500" name="light rain" var="10n"/>
          <precipitation probability="0.7" unit="3h" value="0.49" type="rain"/>
          <windDirection deg="210" code="SSW" name="South-southwest"/>
          <windSpeed mps="2.66" unit="m/s" name="Light breeze"/>
          <windGust gust="3.58" unit="m/s"/>
          <temperature unit="kelvin" value="292.9" min="290.31" max="292.9"/>
          <feels_like value="292.89" unit="kelvin"/>
          <pressure unit="hPa" value="1015"/>
          <humidity value="75" unit="%"/>
          <clouds value="broken clouds" all="68" unit="%"/>
          <visibility value="10000"/>
          </time>
          ...
          <time from="2022-09-04T09:00:00" to="2022-09-04T12:00:00">
          <symbol number="804" name="overcast clouds" var="04d"/>
          <precipitation probability="0"/>
          <windDirection deg="17" code="NNE" name="North-northeast"/>
          <windSpeed mps="1.14" unit="m/s" name="Calm"/>
          <windGust gust="1.57" unit="m/s"/>
          <temperature unit="kelvin" value="294.93" min="294.93" max="294.93"/>
          <feels_like value="294.83" unit="kelvin"/>
          <pressure unit="hPa" value="1018"/>
          <humidity value="64" unit="%"/>
          <clouds value="overcast clouds" all="88" unit="%"/>
          <visibility value="10000"/>
          </time>
          </forecast>
          </weatherdata>
            
          XML format API response fields
          {
            "main":{
"temp":306.15, //current temperature
"pressure":1013,
"humidity":44,
"temp_min":30.15, //min current temperature in the city
"temp_max":306.15 //max current temperature in the city
},
          }              
    }
}
}
"dt":1406080800,
"temp":{
    "day":297.77,  //daily averaged temperature
    "min":293.52, //daily min temperature
    "max":297.77, //daily max temperature
    "night":293.52, //night temperature
    "eve":297.77, //evening temperature
    "morn":297.77}, //morning temperature
  {
    api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

api.openweathermap.org/data/2.5/forecast?q={city name},{country code}&appid={API key}

api.openweathermap.org/data/2.5/forecast?q={city name},{state code},{country code}&appid={API key}
  }
  api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml&appid={API key}
}
api.openweathermap.org/data/2.5/forecast?q=München,DE&appid={API key}
}
api.openweathermap.org/data/2.5/forecast?id={city ID}&appid={API key}
}
api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}
}
api.openweathermap.org/data/2.5/forecast?zip={zip code},{country code}&appid={API key}
}
api.openweathermap.org/data/2.5/forecast?zip=94040,us&appid={API key}
}
api.openweathermap.org/data/2.5/weather?q=London&appid={API key}


                  
{
"cod": "200",
"message": 0,
"cnt": 40,
"list": [
{
  "dt": 1647345600,
  "main": {
    "temp": 287.39,
    "feels_like": 286.38,
    "temp_min": 286.69,
    "temp_max": 287.39,
    "pressure": 1021,
    "sea_level": 1021,
    "grnd_level": 1018,
    "humidity": 58,
    "temp_kf": 0.7
  },
  "weather": [
    {
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04d"
    }
  ],
  "clouds": {
    "all": 71
  },
  "wind": {
    "speed": 3.08,
    "deg": 128,
    "gust": 4.3
  },
  "visibility": 10000,
  "pop": 0,
  "sys": {
    "pod": "d"
  },
  "dt_txt": "2022-03-15 12:00:00"
},
{
  "dt": 1647356400,
  "main": {
    "temp": 287.09,
    "feels_like": 286.13,
    "temp_min": 286.5,
    "temp_max": 287.09,
    "pressure": 1021,
    "sea_level": 1021,
    "grnd_level": 1016,
    "humidity": 61,
    "temp_kf": 0.59
  },
  "weather": [
    {
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04d"
    }
  ],
  "clouds": {
    "all": 81
  },
  "wind": {
    "speed": 3.28,
    "deg": 168,
    "gust": 3.96
  },
  "visibility": 10000,
  "pop": 0,
  "sys": {
    "pod": "d"
  },
  "dt_txt": "2022-03-15 15:00:00"
},
{
  "dt": 1647367200,
  "main": {
    "temp": 285.44,
    "feels_like": 284.6,
    "temp_min": 284.47,
    "temp_max": 285.44,
    "pressure": 1020,
    "sea_level": 1020,
    "grnd_level": 1016,
    "humidity": 72,
    "temp_kf": 0.97
  },
  "weather": [
    {
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04d"
    }
  ],
  "clouds": {
    "all": 90
  },
  "wind": {
    "speed": 2.7,
    "deg": 183,
    "gust": 5.59
  },
  "visibility": 10000,
  "pop": 0,
  "sys": {
    "pod": "d"
  },
  "dt_txt": "2022-03-15 18:00:00"
},
.....
    {
  "dt": 1647766800,
  "main": {
    "temp": 282.42,
    "feels_like": 280,
    "temp_min": 282.42,
    "temp_max": 282.42,
    "pressure": 1036,
    "sea_level": 1036,
    "grnd_level": 1033,
    "humidity": 60,
    "temp_kf": 0
  },
  "weather": [
    {
      "id": 802,
      "main": "Clouds",
      "description": "scattered clouds",
      "icon": "03d"
    }
  ],
  "clouds": {
    "all": 39
  },
  "wind": {
    "speed": 4.58,
    "deg": 83,
    "gust": 8.45
  },
  "visibility": 10000,
  "pop": 0,
  "sys": {
    "pod": "d"
  },
  "dt_txt": "2022-03-20 09:00:00"
}
],
"city": {
"id": 2643743,
"name": "London",
"coord": {
  "lat": 51.5085,
  "lon": -0.1257
},
"country": "GB",
"population": 1000000,
"timezone": 0,
"sunrise": 1647324902,
"sunset": 1647367441
}
}
  
<weatherdata>
<location>
<name>Zocca</name>
<type/>
<country>IT</country>
<timezone>7200</timezone>
<location altitude="0" latitude="44.34" longitude="10.99" geobase="geonames" geobaseid="3163858"/>
</location>
<credit/>
<meta>
<lastupdate/>
<calctime>0</calctime>
<nextupdate/>
</meta>
<sun rise="2022-08-30T04:36:27" set="2022-08-30T17:57:28"/>
<forecast>
<time from="2022-08-30T12:00:00" to="2022-08-30T15:00:00">
<symbol number="500" name="light rain" var="10d"/>
<precipitation probability="0.32" unit="3h" value="0.26" type="rain"/>
<windDirection deg="349" code="N" name="North"/>
<windSpeed mps="0.62" unit="m/s" name="Calm"/>
<windGust gust="1.18" unit="m/s"/>
<temperature unit="kelvin" value="298.08" min="297.87" max="298.08"/>
<feels_like value="298.01" unit="kelvin"/>
<pressure unit="hPa" value="1015"/>
<humidity value="53" unit="%"/>
<clouds value="overcast clouds" all="100" unit="%"/>
<visibility value="10000"/>
</time>
<time from="2022-08-30T15:00:00" to="2022-08-30T18:00:00">
<symbol number="500" name="light rain" var="10n"/>
<precipitation probability="0.33" unit="3h" value="0.57" type="rain"/>
<windDirection deg="157" code="SSE" name="South-southeast"/>
<windSpeed mps="1.97" unit="m/s" name="Light breeze"/>
<windGust gust="3.39" unit="m/s"/>
<temperature unit="kelvin" value="296.33" min="292.84" max="296.33"/>
<feels_like value="296.27" unit="kelvin"/>
<pressure unit="hPa" value="1015"/>
<humidity value="60" unit="%"/>
<clouds value="overcast clouds" all="96" unit="%"/>
<visibility value="10000"/>
</time>
<time from="2022-08-30T18:00:00" to="2022-08-30T21:00:00">
<symbol number="500" name="light rain" var="10n"/>
<precipitation probability="0.7" unit="3h" value="0.49" type="rain"/>
<windDirection deg="210" code="SSW" name="South-southwest"/>
<windSpeed mps="2.66" unit="m/s" name="Light breeze"/>
<windGust gust="3.58" unit="m/s"/>
<temperature unit="kelvin" value="292.9" min="290.31" max="292.9"/>
<feels_like value="292.89" unit="kelvin"/>
<pressure unit="hPa" value="1015"/>
<humidity value="75" unit="%"/>
<clouds value="broken clouds" all="68" unit="%"/>
<visibility value="10000"/>
</time>
...
<time from="2022-09-04T09:00:00" to="2022-09-04T12:00:00">
<symbol number="804" name="overcast clouds" var="04d"/>
<precipitation probability="0"/>
<windDirection deg="17" code="NNE" name="North-northeast"/>
<windSpeed mps="1.14" unit="m/s" name="Calm"/>
<windGust gust="1.57" unit="m/s"/>
<temperature unit="kelvin" value="294.93" min="294.93" max="294.93"/>
<feels_like value="294.83" unit="kelvin"/>
<pressure unit="hPa" value="1018"/>
<humidity value="64" unit="%"/>
<clouds value="overcast clouds" all="88" unit="%"/>
<visibility value="10000"/>
</time>
</forecast>
</weatherdata>
{
"main":{
"temp":306.15, //current temperature
"pressure":1013,
"humidity":44,
"temp_min":30.15, //min current temperature in the city
"temp_max":306.15 //max current temperature in the city
},
                    
        "dt":1406080800,
"temp":{
    "day":297.77,  //daily averaged temperature
    "min":293.52, //daily min temperature
    "max":297.77, //daily max temperature
    "night":293.52, //night temperature
    "eve":297.77, //evening temperature
    "morn":297.77}, //morning temperature
  
}                    
api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

api.openweathermap.org/data/2.5/forecast?q={city name},{country code}&appid={API key}

api.openweathermap.org/data/2.5/forecast?q={city name},{state code},{country code}&appid={API key}
}
api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml&appid={API key}
}
api.openweathermap.org/data/2.5/forecast?q=München,DE&appid={API key}
}
api.openweathermap.org/data/2.5/forecast?id={city ID}&appid={API key}
}
api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}
}
api.openweathermap.org/data/2.5/forecast?zip={zip code},{country code}&appid={API key}
}
api.openweathermap.org/data/2.5/forecast?zip=94040,us&appid={API key}
}
api.openweathermap.org/data/2.5/weather?q=London&appid={API key}


                  
{
"cod": "200",
"message": 0,
"cnt": 40,
"list": [
{
  "dt": 1647345600,
  "main": {
    "temp": 287.39,
    "feels_like": 286.38,
    "temp_min": 286.69,
    "temp_max": 287.39,
    "pressure": 1021,
    "sea_level": 1021,
    "grnd_level": 1018,
    "humidity": 58,
    "temp_kf": 0.7
  },
  "weather": [
    {
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04d"
    }
  ],
  "clouds": {
    "all": 71
  },
  "wind": {
    "speed": 3.08,
    "deg": 128,
    "gust": 4.3
  },
  "visibility": 10000,
  "pop": 0,
  "sys": {
    "pod": "d"
  },
  "dt_txt": "2022-03-15 12:00:00"
},
{
  "dt": 1647356400,
  "main": {
    "temp": 287.09,
    "feels_like": 286.13,
    "temp_min": 286.5,
    "temp_max": 287.09,
    "pressure": 1021,
    "sea_level": 1021,
    "grnd_level": 1016,
    "humidity": 61,
    "temp_kf": 0.59
  },
  "weather": [
    {
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04d"
    }
  ],
  "clouds": {
    "all": 81
  },
  "wind": {
    "speed": 3.28,
    "deg": 168,
    "gust": 3.96
  },
  "visibility": 10000,
  "pop": 0,
  "sys": {
    "pod": "d"
  },
  "dt_txt": "2022-03-15 15:00:00"
},
{
  "dt": 1647367200,
  "main": {
    "temp": 285.44,
    "feels_like": 284.6,
    "temp_min": 284.47,
    "temp_max": 285.44,
    "pressure": 1020,
    "sea_level": 1020,
    "grnd_level": 1016,
    "humidity": 72,
    "temp_kf": 0.97
  },
  "weather": [
    {
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04d"
    }
  ],
  "clouds": {
    "all": 90
  },
  "wind": {
    "speed": 2.7,
    "deg": 183,
    "gust": 5.59
  },
  "visibility": 10000,
  "pop": 0,
  "sys": {
    "pod": "d"
  },
  "dt_txt": "2022-03-15 18:00:00"
},
.....
    {
  "dt": 1647766800,
  "main": {
    "temp": 282.42,
    "feels_like": 280,
    "temp_min": 282.42,
    "temp_max": 282.42,
    "pressure": 1036,
    "sea_level": 1036,
    "grnd_level": 1033,
    "humidity": 60,
    "temp_kf": 0
  },
  "weather": [
    {
      "id": 802,
      "main": "Clouds",
      "description": "scattered clouds",
      "icon": "03d"
    }
  ],
  "clouds": {
    "all": 39
  },
  "wind": {
    "speed": 4.58,
    "deg": 83,
    "gust": 8.45
  },
  "visibility": 10000,
  "pop": 0,
  "sys": {
    "pod": "d"
  },
  "dt_txt": "2022-03-20 09:00:00"
}
],
"city": {
"id": 2643743,
"name": "London",
"coord": {
  "lat": 51.5085,
  "lon": -0.1257
},
"country": "GB",
"population": 1000000,
"timezone": 0,
"sunrise": 1647324902,
"sunset": 1647367441
}
}
api.openweathermap.org/data/2.5/weather?q=London&mode=xml


                  
<weatherdata>
<location>
<name>London</name>
<type/>
<country>GB</country>
<timezone>0</timezone>
<location altitude="0" latitude="51.5085" longitude="-0.1257" geobase="geonames" geobaseid="2643743"/>
</location>
<credit/>
<meta>
<lastupdate/>
<calctime>0</calctime>
<nextupdate/>
</meta>
<sun rise="2022-03-15T06:15:02" set="2022-03-15T18:04:01"/>
<forecast>
<time from="2022-03-15T09:00:00" to="2022-03-15T12:00:00">
<symbol number="803" name="broken clouds" var="04d"/>
<precipitation probability="0"/>
<windDirection deg="128" code="SE" name="SouthEast"/>
<windSpeed mps="3.08" unit="m/s" name="Light breeze"/>
<windGust gust="4.3" unit="m/s"/>
<temperature unit="kelvin" value="287.52" min="286.69" max="287.52"/>
<feels_like value="286.47" unit="kelvin"/>
<pressure unit="hPa" value="1021"/>
<humidity value="56" unit="%"/>
<clouds value="broken clouds" all="71" unit="%"/>
<visibility value="10000"/>
</time>
<time from="2022-03-15T12:00:00" to="2022-03-15T15:00:00">
<symbol number="803" name="broken clouds" var="04d"/>
<precipitation probability="0"/>
<windDirection deg="168" code="SSE" name="South-southeast"/>
<windSpeed mps="3.28" unit="m/s" name="Light breeze"/>
<windGust gust="3.96" unit="m/s"/>
<temperature unit="kelvin" value="287.18" min="286.5" max="287.18"/>
<feels_like value="286.18" unit="kelvin"/>
<pressure unit="hPa" value="1021"/>
<humidity value="59" unit="%"/>
<clouds value="broken clouds" all="81" unit="%"/>
<visibility value="10000"/>
</time>
<time from="2022-03-15T15:00:00" to="2022-03-15T18:00:00">
<symbol number="804" name="overcast clouds" var="04d"/>
<precipitation probability="0"/>
<windDirection deg="183" code="S" name="South"/>
<windSpeed mps="2.7" unit="m/s" name="Light breeze"/>
<windGust gust="5.59" unit="m/s"/>
<temperature unit="kelvin" value="285.49" min="284.47" max="285.49"/>
<feels_like value="284.66" unit="kelvin"/>
<pressure unit="hPa" value="1020"/>
<humidity value="72" unit="%"/>
<clouds value="overcast clouds" all="90" unit="%"/>
<visibility value="10000"/>
</time>
....
<time from="2022-03-20T06:00:00" to="2022-03-20T09:00:00">
<symbol number="802" name="scattered clouds" var="03d"/>
<precipitation probability="0"/>
<windDirection deg="83" code="E" name="East"/>
<windSpeed mps="4.58" unit="m/s" name="Gentle Breeze"/>
<windGust gust="8.45" unit="m/s"/>
<temperature unit="kelvin" value="282.42" min="282.42" max="282.42"/>
<feels_like value="280" unit="kelvin"/>
<pressure unit="hPa" value="1036"/>
<humidity value="60" unit="%"/>
<clouds value="scattered clouds" all="39" unit="%"/>
<visibility value="10000"/>
</time>
</forecast>
</weatherdata>
}
https://api.openweathermap.org/data/2.5/forecast?lat=57&lon=-2.15&cnt=3&appid={API key}
}
https://api.openweathermap.org/data/2.5/forecast?lat=57&lon=-2.15&appid={API key}
}
https://api.openweathermap.org/data/2.5/forecast?lat=57&lon=-2.15&appid={API key}&units=metric
}
https://api.openweathermap.org/data/2.5/forecast?lat=57&lon=-2.15&appid={API key}&units=imperial
}
http://api.openweathermap.org/data/2.5/forecast?id=524901&lang={lang}
}
http://api.openweathermap.org/data/2.5/forecast?id=524901&lang=zh_cn&appid={API key}                        
}
api.openweathermap.org/data/2.5/forecast?q=London,uk&callback=test&appid={API key}
  }
