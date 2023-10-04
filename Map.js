import React from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import GoogleReact from 'google-maps-react';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import LocationIcon from '@mui/icons-material/LocationIcon';
export default class Map extends React.Component{

constructor(props){
    super();
    this.state={
        latitude:24.723456,
        longitude:46.70095,
        persons: [],
        selectedpersonId: null,
        markerClicked:false,
        searchText: "",
    }
}

componentDidMount=()=>{
    navigator.geolocation.getCurrentPosition(
        (position)=>{
            console.log(position.coords)
            this.setState({
                latitude:position.coords.latitude,
                longitude:position.coords.longitude,
                persons
            })
        },
        (error)=>{
            console.log("Error Getting Location: "+error.message)
        }
    )
}

    header= ()=>{
        const handleSearch=()=>{
            let filterpersons=persondata.filter(p=>p.name.toLowerCase().includes(this.state.searchText.toLowerCase()))
            this.setState({
                persons:filterpersons
            })
        }
        return (
            <div style={{backgroundColor:"pink"}}>
                <Typography variant='h4' style={{textAlign: "center"}}>
                    PersonFinder
                </Typography>
                <TextField label="Search for a person" variant="outlined" style={{width:"100%"}}
                onChange={(event)=> {this.setState({searchText: event.target.value})}}/>
                <div style={{display:"flex", flexDirection:"row", justifyContent: "space-between", alignItems:"center"}}>
                    <Typography>
                        Distance:
                    </Typography>
                <Slider style={{width:"75%"}}/>
                </div>
                <div>
                 <Button variant="contained" style={{width:"50%"}}>
                    <RestartAltIcon/>Reset</Button>
                 <Button variant="contained" 
                 onClick={handleSearch}
                 style={{width:"50%"}} >
                 <SearchIcon/>
                 Search
                 </Button>
                </div>
            </div>
        )
    }
    map=()=>{
        const clickedOutside= (x,y, lat, lng, event)=>{
          if (this.state.marketClicked==true){
            this.setState({
                selectedpersonId:null,
                markerClicked: false
            })
          }
          else{
            console.log("Clicked on map")
          }
        }
        return (
            <div style={{backgroundColor:"cyan", height:"88vh"}}>
                <GoogleReact
                onClick={()=> {this.setState({selectedpersonId: null})}}
                bootstrapURLKeys={{key:"AIzaSy8806lp-55ru_6BlsasIy7T3KayK2abq4E"}}
                defaultCenter={{
                    lat:22.746602874039908,
                    lng:88.34864766478961
                }}
                defaultZoom={14}
                onClick={()=> {console.log("onclick map")}}>
                {
                    this.state.persons.map((person)=> {
                        return (
                            <LocationIcon color={"secondary"}
                            lat={person.latitude}
                            lng={person.latitude}
                            
                            onClick={()=> {this.setState({selectedpersonId: person.id, markerClicked: true})}}/>
                        )
            
                        
                    }
                    )
                }
                {
                    this.state.persons((person)=>{
                        if(this.state.selectedpersonId==person.id)
                        {
                            return (
                                <div lat={person.latitude}
                                lng={person.longitude}
                                style={{backgroundColor: "white", width: "100"}}>
                                    <Typography>
                                        {person.name}
                                    </Typography>
                                </div>
                            )
                        }
                        else {
                            return null
                        }
                    })
                }
                
                   <LocationSearchingIcon color={"primary"}
                   lat={this.state.latitude}
                   lng={this.state.longitude}/>
                    </GoogleReact></div>
        )
    }
    render()
    {
        return (
            <div style={{backgroundColor:"beige"}}>
                {this.header()}
                {this.map()}
            </div>
        )
    }
}

let persondata=[
    {
        id: "1",
        name: "Arijit Mukerjee",
        latitude:22.735409407451154,
        longitude:88.35175571091314
    },
    {
        id: "2",
        name: "Amares Nanda",
        latitude: 22.535294250852765,
        longitude:88.32306103464134
    },
    {
        id: "3",
        name: "Shourja Banerjee",
        latitude:22.590322041076277,
        longitude:88.40160390708357
    },
    {
        id: "4",
        name: "Ishita Nanda",
        latitude:22.746602874039908,
        longitude:88.34864766478961
    }
]
