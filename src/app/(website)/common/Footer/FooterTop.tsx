import Image from 'next/image'
import React from 'react'
import map from '../../../../../public/assets/icons/map.png'
import call from '../../../../../public/assets/icons/call.png'
import mail from '../../../../../public/assets/icons/mail.png'
import Link from 'next/link'


export interface IFooterTop {
    icon: any,
    name: String,
    description: String,
    path: any
}
const data = [
    {
        icon: map,
        name: "Find Us",
        description: "B-509, 5th Floor, Bestech Business Towers, Sector 66, SAS Nagar, Punjab 160066",
        path: "https://maps.app.goo.gl/CEMtUbQd1246YQ3c7"
    },
    {
        icon: call,
        name: "Call Us",
        description: "91-8907400008",
        path: "tel:+91-8907400008"
    },
    {
        icon: mail,
        name: "Mail Us",
        description: "info@adaired.com",
        path: "mailto:info@adaired.com"
    },

]
const FooterTop = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-4'>
            {data?.map((item: IFooterTop, idx) => {
                return (
                    <Link
                        key={idx}
                        href={item?.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${item?.name === "Find Us" && "col-span-1 lg:col-span-2"} flex gap-3 cursor-pointer py-2`}>
                        <Image src={item?.icon} width={50} height={45} alt='icon' className='mb-auto' />
                        <div>
                            <p className='text-[18px] text-white'>{item?.name}</p>
                            <p className='text-[20px] font-[600] leading-7 pt-1 text-white'>{item?.description}</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default FooterTop
