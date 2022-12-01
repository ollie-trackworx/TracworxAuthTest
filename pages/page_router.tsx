import { Image } from "react-native"
import { Alignment, Column } from "../components/layout"

type PageRouterProps = {

}
const PageRouter: React.FC<PageRouterProps> = ()=>{

    return <Column alignment={Alignment.center}>
        <Image source={require("../assets/logo.png")}/>
    </Column> 
}

export default PageRouter;