import { Carousel } from 'flowbite-react';
import Image from 'next/image';
import frame1 from '../../public/metadata/frame1.png'
import frame2 from '../../public/metadata/frame2.png'

export default function DefaultForm() {
    return(
    <div className="smartphone:h-44 sm:h-64 xl:h-80 2xl:h-96 z-0">
        <Carousel style={{ borderRadius: '0' }}>
            <Image
                alt='frame1'
                src={frame1}
                width={1000}
                height={1000}
            />
            <Image
                alt="frame2"
                src={frame2}
                width={1000}
                height={1000}
            />
        </Carousel>
    </div>
    )
}





