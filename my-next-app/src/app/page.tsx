import { ReactNode } from "react"
import Link from "next/link"
import { Dot } from "./../components/icons/Dot"
import { VerticalLine } from "./../components/icons/VerticalLine"
import { lusitana } from "./ui/fonts"
// import { useRouter } from "next/router"
import Image from "next/image";

type StepsLayoutProps = {
  children: ReactNode
}

const StepsLayout = ({ children }: StepsLayoutProps) => {
    // const router = useRouter()
 
    return (
    <article className='flex justify-start gap-28 min-w-[82%]'>
      <Image 
      src="/window.svg"
      width={1000}
      height={760}
      className="hidden md:block"
      alt="window"
      />
      <Image
      src={"/globe.svg"}
      width={560}
      height={620}
      className="block md:hidden"
      alt="globe"
      />

      <div
  className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black"
/>
      <div className='flex flex-col px-8 py-6 mx-20 h-[200px] border-r-2 border-[#8586887c] border-dashed'>
      <Link href='/step-one'>
          <div className='flex items-center gap-4'>
            {/* <!--dot is highlighted (active) here--> */}
            <Dot active />
            <p className={`${lusitana.className} text-xl md:text-3xl md:leading-normal`}>Step Otu</p>
          </div>
        </Link>
        {/* <!--vertical line is not active--> */}
        <VerticalLine active={false} />
        <Link href='/step-two'>
          <div className='flex items-center gap-4'>
            {/* <!--the second dot is not active--> */}
            <Dot active={false} />
            <p>Step 2</p>
          </div>
        </Link>

{/* <!--the second vertical line is not active too--> */}
        <VerticalLine active={false} />
        <Link href='/your-answers'>
          <div className='flex items-center gap-4'>
            {/* <!--the third dot is not active--> */}
            <Dot active={false} />
            <p>Your Answers</p>
          </div>
        </Link>      </div>
      <form>{children}</form>
    </article>
  )
}

export default StepsLayout;