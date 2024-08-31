
import Lottie from "lottie-react";
import './loading.scss'
import vehicleLoading from '../../lottieFiles/carLoading.json'

const Loading = () => {
    return (
        <div className='loading-container w-full h-full absolute left-0 top-0 bg-black-100 grid place-items-center z-50'>
            <Lottie animationData={vehicleLoading} loop={true} />
        </div>
    )
}

export default Loading