import { Platform } from "react-native"
import { primaryColor,secondaryColor } from "./layout.styles"

export const loginBtn={  
    alignItems:'center',
    justifyContent:'center',
    width:132,
    height:40,
    backgroundColor:primaryColor,
    borderRadius:800,
    alignSelf:'center',
    marginBottom:Platform.OS=='android'?25:0
}

export const disabledBtn={
    backgroundColor:secondaryColor
}