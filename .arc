@app
weather-station

@html
get /

@json
get /weather-data
post /weather-data

@tables
weather-data
  _id *String

@indexes
weather-data
  time *Number