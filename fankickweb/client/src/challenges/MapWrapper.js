/* eslint-disable */
import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, geocodeByPlaceId,getLatLng } from 'react-places-autocomplete'
import { Input,Button ,Form, Col} from 'antd'
import classnames from 'classnames';
const FormItem = Form.Item;
class MapWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      lat1:'',
      lng1:'',
      Locid:'',
      geocodeResults: null,
      loading: false,
      errors:{}
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderGeocodeFailure = this.renderGeocodeFailure.bind(this)
   // this.renderGeocodeSuccess = this.renderGeocodeSuccess.bind(this)
    //this.submit999 = this.submit999.bind(this);
  }
componentWillMount () {
 // console.log("this.props in will mount",this.props.mapdata);
  if(this.props.mapdata != undefined){
    this.setState({address:this.props.mapdata});
  }
}
  handleSelect(address) {
    this.setState({
      address,
      loading: true
    })

    geocodeByAddress(address)
   
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        //console.log('Success Yay', { lat, lng })
        let addressarray=[];
        var data={};
        let Locid1='';
        var length=this.state.address.length
        if(length === 4){
        var res= this.state.address.split(",").map(function(item) {
         // console.log("item",item);
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
                 // console.log("item",item);
                  addressarray.push(item);
                          });
                         data=  {
                            "city":addressarray[3],
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
        var _this = this;
        fetch(request)
          .then(response => response.json())
          .then(function (response) {
            if (response.status === 200) {
              _this.props.submit44(_this.state.address, response.data._id);
              _this.setState({
                address: ''
              })
            }
          })
          this.setState({
            loading: false,
            lat1: lat,
            lng1: lng,
            Locid: Locid1
          })
        })
        .catch((error) => {
          this.setState({
            geocodeResults: this.renderGeocodeFailure(error),
            loading: false
          })
      })
  }

  handleChange(address) {
    this.setState({
      address,
      geocodeResults: null
    })
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
  // submit999 () {
  //   let errors={};
  //   console.log("address value",this.state.address)
  //   if(this.state.address === '')errors.address="cant be empty"
  //   this.setState({errors});
  //   if (Object.keys(errors).length === 0) {
  //     this.props
  //     .submit44(this.state.address)
      
  //   }
  // }
  render() {
   // console.log("this.state in map",this.state);
    
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
      <div className='page-wrapper'>
       
         
        <div >
           <Col className="SearchantCol-16">
          <PlacesAutocomplete
            onSelect={this.handleSelect}
            autocompleteItem={AutocompleteItem}
            onEnterKeyDown={this.handleSelect}
            classNames={cssClasses}
            className="width200"
            inputProps={inputProps}
            defaultValue={this.state.address}
          />
          {this.state.loading ? <div><i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" /></div> : null}
          {!this.state.loading && this.state.geocodeResults ?
            <div className='geocoding-results'>{this.state.geocodeResults}</div> :
          null}
         </Col>
        </div>
       
      </div>
    )
  }
}

export default MapWrapper
/* eslint-disable */