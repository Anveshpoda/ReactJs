/* eslint-disable */
import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, geocodeByPlaceId,getLatLng } from 'react-places-autocomplete'
import { Input,FormItem, Col } from 'antd'

class MapWrapper2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      lat1:'',
      lng1:'',
      Locid:'',
      editdata:{},
      karoke:{},
      dubshmash:{},
      aboutMovie:{},
      place1:[],
      place2:[],
      geocodeResults: null,
      loading: false
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderGeocodeFailure = this.renderGeocodeFailure.bind(this)
    //this.renderGeocodeSuccess = this.renderGeocodeSuccess.bind(this)
  }
  componentWillMount(){
 //console.log("this.props in map wrapper",this.props.editdata)
 this.setState({address:this.props.childerr1})
  this.setState({ editdata: this.props.editdata });
  this.setState({ karoke: this.props.editdata.karoke, dubshmash: this.props.editdata.dubshmash  })
}
componentDidMount(){
  
  const data = this.state.karoke
  if (data != '' && data != undefined) {
   // console.log("have some location data in karokr map", data);
   var locationIds=[]
     locationIds =data.locationIds[0]
    if(locationIds != '' && locationIds != undefined){
  //  console.log("locaidsimchecking",locationIds)
 //   console.log("state",locationIds[0].state);
 //   console.log("cooredinates",locationIds[0].coordinates[0].area)
 var city=locationIds.city
 var state = locationIds.state
var country = locationIds.country
var area=locationIds.coordinates[0].area
 var place=`${city}${state}${country}${area}`
        // console.log("place name",place);
         this.setState({ address:place })
    }
    else{
     // console.log("no location data in karoke")
    }
  }
  else if( data === '' && data === undefined) {
   // console.log("undefinde  karokr map ", data)
}
const data1 = this.state.dubshmash
  if (data1 === '' && data1 === undefined ) {
   // console.log("undefinde i am dunsma map ", data1)
  }
  else if (data1 != '' && data1 != undefined) {
   // console.log("have some data dunb in map", data1);
   var locationIds=[]
       locationIds=data1.locationIds[0]
      if(locationIds != '' && locationIds != undefined){
        //console.log("locaidsimchecking in dub",locationIds)
        var city=locationIds.city
        var state = locationIds.state
       var country = locationIds.country
       var area=locationIds.coordinates[0].area
        var place=`${city}${state}${country}${area}`
      //  console.log("place name",place);
        this.setState({ address :place })
      }else{
       // console.log("no location dat afor dubsmash")
      }
  }
  
}
  handleSelect(address) {
   // console.log("handleSelectmap",address);
    this.setState({
      address,
      loading: true
    })

    geocodeByAddress(address)
   
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
     //  console.log('Success Yay', { lat, lng })
        let addressarray=[];
        var data={};
        let Locid1='';
        var length=this.state.address.length
        if(length === 4){
        var res= this.state.address.split(",").map(function(item) {
       //   console.log("item",item);
          addressarray.push(item);
                  });
                 data=  {
                    "city":addressarray[1],
                    "state":addressarray[2],
                    "country":addressarray[3],
                    "coordinates":[
                        {
                            "area":addressarray[0],
                            "latitude":lat,
                            "longitude":lng
                        }
                         
                    ]
                    
                    
                }
              }else {
                var res= this.state.address.split(",").map(function(item) {
                //  console.log("item",item);
                  addressarray.push(item);
                          });
                         data=  {
                            "city":addressarray[0],
                            "state":addressarray[1],
                            "country":addressarray[2],
                            "coordinates":[
                                {
                                    "area":addressarray[0],
                                    "latitude":lat,
                                    "longitude":lng
                                }
                                 
                            ]
                            
                            
                        }
              }
                 // console.log("preloaddata", data);
                  var self=this;
        const url = '/location';
        var request = new Request(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            'x-access-token': sessionStorage.getItem('token')
          }
        });
        fetch(request)
          .then(response => response.json())
          .then(function (response) {
            if (response.status === 200) {
           //   console.log("location api success", response.data._id);
              
              sessionStorage.setItem('locationkey', response.data._id)
            }
            else {
            //  console.log("location api failure", response.data);
            }
          })
         
        this.setState({
          geocodeResults: this.renderGeocodeSuccess(lat, lng),
          loading: false,
          lat1:lat,
          lng1:lng,
          Locid:Locid1
        })
        this.props
        .submit44(address,this.state.lat1)
        
      })
      .catch((error) => {
        //console.log('Oh no!', error)
        this.setState({
          geocodeResults: this.renderGeocodeFailure(error),
          loading: false
        })
     
        
      })

    /* NOTE: Using callback (Deprecated version) */
    // geocodeByAddress(address,  (err, { lat, lng }) => {
    //   if (err) {
    //     console.log('Oh no!', err)
    //     this.setState({
    //       geocodeResults: this.renderGeocodeFailure(err),
    //       loading: false
    //     })
    //   }
    //   console.log(`Yay! got latitude and longitude for ${address}`, { lat, lng })
    //   this.setState({
    //     geocodeResults: this.renderGeocodeSuccess(lat, lng),
    //     loading: false
    //   })
    // })
  }

  handleChange(address) {
    //console.log("handlechangeinmap",address);
    this.setState({
      address,
      geocodeResults: null
    })
    this.props.submit44(address);
    // var self=this;
    // self.handleSelect();
    }
  componentWillUnmount(){
   // console.log("called un mount")
    this.props.submit44(this.state.address,this.state.lat1);
  }
  renderGeocodeFailure(err) {
    return (
      <div className="error" role="alert">
        <strong>Error! Please give correct details</strong> {err}
      </div>
    )
  }

  // renderGeocodeSuccess(lat, lng) {
  //   return (
  //     <div className="alert alert-success" role="alert">
  //       <strong>Success!</strong> Geocoder found latitude and longitude: <strong>{lat}, {lng}</strong>
  //     </div>
  //   )
  // }

  render() {
  //  console.log("this.state in mapwrapper2",this.state);
    const cssClasses = {
      root: 'form-group',
      input: 'Demo__search-input ant-input ant-input-lg',
      autocompleteContainer: 'Demo__autocomplete-container',
    }

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="Demo__suggestion-item">
        <i className='fa fa-map-marker Demo__suggestion-icon'/>
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">{formattedSuggestion.secondaryText}</small>
      </div>)

    const inputProps = {
      type: "text",
      value: this.state.address,
      onChange: this.handleChange,
      onBlur: () => { console.log('Blur event!'); },
      onFocus: () => { console.log('Focused!'); },
      autoFocus: true,
      placeholder: "Search Places",
      name: 'Demo__input',
      id: "my-input-id",
    }

    return (
      <div  readOnly={this.props.readOnly} className='page-wrapper'>
       
         
        <div>
        <Col className="SearchantCol-16">
          <PlacesAutocomplete
            onSelect={this.handleSelect}
            autocompleteItem={AutocompleteItem}
            onEnterKeyDown={this.handleSelect}
            classNames={cssClasses}
            inputProps={inputProps}
             className="width200"
            value={this.state.address}
          />
          {this.state.loading ? <div><i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" /></div> : null}
          {!this.state.loading && this.state.geocodeResults ?
            <div readOnly={this.props.readOnly} className='geocoding-results'>{this.state.geocodeResults}</div> :
          null}
          
        </Col>
        </div>

        <div>
          {/* {this.state.place1.length === 0 ? this.state.place2 : this.state.place1} */}
          {/* {this.state.place2.length === 0 ? null : this.state.place2} */}
          </div>
      </div>
    )
  }
}

export default MapWrapper2
/* eslint-disable */