import { Image, View } from "react-native"
import { Column } from "../components/layout"

type LoginProps= {

}
const LoginPage: React.FC<LoginProps> = ()=>{
    return <Column>
        <Image source={require('./assets/logo.png')}/>
    </Column>
}