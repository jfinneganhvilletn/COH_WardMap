//Javascript section of web map
// seperates out HTML, CSS, and JS portion of this web map

require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer"


], function (esriConfig, Map, MapView, FeatureLayer) {
    esriConfig.apiKey = "AAPK7745abd4b6254f8bb2efb209ba35bc7czdt4qsdbofn6rm5yG0_0eCN4FWD40e4zBuNOF8teRErBo2twTW2zFZiHqTtl5AAq"

    const map = new Map({
        basemap: "dark-gray" // Basemap Layer Service
    });

    const view = new MapView({
        map: map,
        center: [-86.613628, 36.305479],
        zoom: 12.5, //zoom level
        container: "viewDiv" // Div Element
    });
    
    const template = {
        title: "{LONGNAME}",
        content: [
            {
                type: "fields",
                fieldInfos: [
                    {
                        fieldName: "TOTAL",
                        label: "Population",
                        format: {
                            digitSeparator: true,
                            places: 0
                        }
                    },
                    {
                        fieldName: "Alderman_1",
                        label: "Alderman 1"

                    },
                    {
                        fieldName: "Alderman_2",
                        label: "Alderman 2"

                    }
                ]
            }
        ]

    };


//Referencing the popul template
//Adding in Wards Layer
    const WardsLayer = new FeatureLayer({
        url: "https://services8.arcgis.com/xMDlahVcw6bSUp5O/arcgis/rest/services/City_of_Hendersonville/FeatureServer/16",
        popupTemplate: template

    });

    map.add(WardsLayer);

});