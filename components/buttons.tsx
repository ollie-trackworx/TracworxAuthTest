import { Button, Text } from "@react-native-material/core"
import React from "react"
import { View } from "react-native"

type ButtonProps = {
    label:string,
    color:string,
    icon?:React.ReactElement

}
export const ElevatedButton: React.FC<ButtonProps> = ({label,color,icon})=>{
    return <View>
        <Button title={label} leading = {icon} variant="contained" color={color??"transparent"}>
          
        </Button>
    </View>
}