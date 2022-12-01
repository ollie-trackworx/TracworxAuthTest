import React from "react"
import { StyleSheet, View } from "react-native"

export enum Alignment{
    right = "flex-end",
    left = "flex-start",
    top = "flex-start",
    bottom="flex-end",
    center="center",
    spaceBetween="space-between",
    spaceAround = "space-Around",
    spaceEvenly = "space-evenly"
}
type Props = {
    children?: React.ReactNode,
    alignment?:Alignment
    style?: any
}
const styles = StyleSheet.create({
    column:{
        display:"flex",
        flexDirection:"column",
        flexWrap:"wrap",
        flex:1
    },
    row:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        flex:1
    }
})
export const Column: React.FC<Props> = ({children,style,alignment})=>{
  
    return <View style = {{...style,...styles.column,justifyContent:alignment??Alignment.left}}>
        {children}
    </View>
}

export const Row: React.FC<Props> = ({children,style,alignment})=>{
  
    return <View style = {{...style,...styles.row,justifyContent:alignment??Alignment.left}}>
        {children}
    </View>
}
