//Javascript section of web map
// seperates out HTML, CSS, and JS portion of this web map

require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend",
    "esri/widgets/Locate",
    "esri/widgets/Search",
    "dojo/domReady!"


], function (esriConfig, Map, MapView, FeatureLayer, Legend, Locate, Search) {
    esriConfig.apiKey = "AAPK7745abd4b6254f8bb2efb209ba35bc7czdt4qsdbofn6rm5yG0_0eCN4FWD40e4zBuNOF8teRErBo2twTW2zFZiHqTtl5AAq"

    const map = new Map({
        basemap: "arcgis-navigation-night" // Basemap Layer Service
    });

    
    const view = new MapView({
        map: map,
        center: [-86.613628, 36.305479],
        zoom: 11.5, //zoom level
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
        url: "https://services8.arcgis.com/xMDlahVcw6bSUp5O/arcgis/rest/services/City_of_Hendersonville/FeatureServer/45",
        popupTemplate: template,
        popup: {autoOpenEnabled: true
        }

    });

    const legend = new Legend({
        container: "legendDiv",
        view: view,
       
    });

    const locate = new Locate({
        view: view,
        useHeadingEnabled: false,
        goToOverride: function(view, options) {
            options.target.scale = 1300;
            return view.goTo(options.target);
        }
    });

    const searchbar = new Search({
        view: view,
        goToOverride: () => null,
        popupOpenOnSelect: false
    });

    searchbar.on('select-result', function(evt){
        let query = sections.createQuery();
        query.geometry = evt.result.WardsLayer.geometry;
        query.spatialRelationship = "within";
        query.WardsLayer.outFields = ["*"];
        query.returnGeometry = true;    
        query.outSpatialReference = view.spatialReference;
        query.maxAllowableOffset = 0;
        sections.queryFeatures(query).ten(function(result){
            view.popup.open({
                features: result.WardsLayer,
                location: result.WardsLayer[0].geometry.centroid
            });
        });
    });
        


    map.add(WardsLayer);

    view.ui.add(legend, "bottom-right");

    view.ui.add(searchbar, "top-right");

    view.ui.add(locate, "top-right")


});