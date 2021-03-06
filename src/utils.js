module.exports = {

    buildGeoJSON(data) {

        let features = data.map((info) => {
            return {
                type: 'Feature',
                geometry: JSON.parse(info.geom),
                properties: {
                    summary: info.summary, 
                    sourceurl: info.source
                }
            }
        })

        return {
            name: 'GDELT Stories',
            type: 'FeatureCollection',
            features: features
        }
    }

}