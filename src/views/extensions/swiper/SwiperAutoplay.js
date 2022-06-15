// ** Third Party Components
import { Swiper, SwiperSlide } from "swiper/react/swiper-react"

// ** Reactstrap Imports
import { Card, CardBody } from "reactstrap"

// ** Images
import img1 from "@src/assets/images/banner/banner-20.jpg"
import img2 from "@src/assets/images/banner/banner-7.jpg"
import img3 from "@src/assets/images/banner/banner-8.jpg"
import img4 from "@src/assets/images/banner/banner-9.jpg"
import img5 from "@src/assets/images/banner/banner-10.jpg"
import img6 from "@src/assets/images/banner/banner-11.jpg"
import { useEffect, useState } from "react"

const params = {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    clickable: true,
  },
  navigation: true,
}

const SwiperAutoplay = ({ isRtl, images }) => {
    const [allImages, setAllImages] = useState(images)
    useEffect(() => {
      if(!allImages){
        setAllImages([img1, img2, img3, img4, img5, img6])
      }
    },[])

  return (
    // <Card>
    //   <CardBody>
        <Swiper dir={isRtl ? "rtl" : "ltr"} {...params}>
          {allImages && allImages.map((image, index) => (
              <SwiperSlide key={index} className="d-flex justify-content-center align-items-center">
                <img src={image} alt={`image ${index + 1}`} className="img-fluid" style={{height: "500px", width: "100%"}} />
              </SwiperSlide>
            ))}
        </Swiper>
    //   </CardBody>
    // </Card>
  )
}

export default SwiperAutoplay
