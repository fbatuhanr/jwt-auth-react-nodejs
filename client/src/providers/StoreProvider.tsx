import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'

const StoreProvider = ({ children }: { children: React.ReactNode }) => {

    const storeRef = useRef<AppStore>()
    if (!storeRef.current)
        storeRef.current = makeStore()

    return (
        <Provider store={storeRef.current}>
            <PersistGate loading={null} persistor={storeRef.current.__persistor}>
                {children}
            </PersistGate>
        </Provider>
    )

}
export default StoreProvider