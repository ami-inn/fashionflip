import { proxy } from 'valtio'

const state = proxy({

    intro:true, //for are we currently in home page or not
    color:'#EFBD48',//default color
    isLogoTexture:true,//currently displaying the logo for out shirt
    isFullTExture:false,//
    logoDecal:'./threejs.png',//initial logo for shirt decal
    fullDecal:'./threejs.png' //threejs logo



})

//its like context for global state management if we write something inside the proxy it will get all over the app

export default state