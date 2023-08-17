import axios from "axios"
import { useEffect, useState } from "react"
import { Carousel } from "react-responsive-carousel"
import 'react-responsive-carousel/lib/styles/carousel.min.css'

type FetchDataType = {
    success: boolean
    total_photos: number
    message: string
    offset: number
    limit: number
    photos: PhotoType[]
}

type PhotoType = {
    title: string
    user: number
    description: string
    id: number
    url: string
}

export const Slider = () => {
    const [images, setImages] = useState<FetchDataType>()
    const [preloader, setPreloader] = useState<boolean | "Loading images...">(false)
    const [error, setError] = useState<string>()

    const fetchData = async () => {
        try {
            setPreloader("Loading images...")

            const url = "https://api.slingacademy.com/v1/sample-data/photos?limit=50"
            const res = await axios.get<FetchDataType>(url)
            setImages(res.data)
        } catch (err) {
            if (err instanceof Error) setError(err.message)
        } finally {
            setPreloader(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div>
            <h2
                style={{
                    color: "#4d70b6e3",
                    marginTop: "-10px"
                }}>
                Image Slider
            </h2>
            
            {<div style={{
                color: "#FF0000",
                fontSize: "30px"
            }}>{error && error}</div>}

            {images && images.photos.length > 0 ? (
                <Carousel
                    showArrows
                    showThumbs={false}
                    width="650px"
                >
                    {images.photos.map(({ id, url }) => {
                        return (
                            <div key={id}>
                                <img
                                    src={url}
                                    alt="photo"
                                    style={{ borderRadius: "15px" }}
                                />
                            </div>
                        )
                    }
                    )}
                </Carousel>
            ) : <p style={{
                    color: "#4d70b6e3",
                    fontSize: "25px"
            }}>{preloader}</p>}
        </div>
    )

}