'use client'
import { Provider as ProviderRX } from "react-redux";
import store from "./store";

const ProvidersRedux = ({children}) =>{
    return(
        <ProviderRX store={store}>
            {children}
        </ProviderRX>
    )
}

export default ProvidersRedux;