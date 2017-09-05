@app
weather-station

@html
get /

@json
get /weather-data
post /weather-data

@tables
weather-data
  deviceId *String
  time **Number  