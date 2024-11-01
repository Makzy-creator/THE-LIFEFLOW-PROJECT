import { ReactNode } from "react"
import Link from "next/link"
import { Dot } from "@/components/icons/Dot"
import { VerticalLine } from "@/components/icons/VerticalLine"


type StepsLayoutProps = {
  children: ReactNode
}

const StepsLayout = ({ children }: StepsLayoutProps) => {
    // const router = useRouter()
 
    return (
    <article className='flex justify-start gap-28 min-w-[82%]'>
      <div className='flex flex-col px-8 py-6 mx-20 h-[200px] border-r-2 border-[#8586887c] border-dashed'>
      <Link href='/dashboard/stepone'>
          <div className='flex items-center gap-4'>
            {/* <!--dot is highlighted (active) here--> */}
            <Dot active />
            <p>Step 1</p>
          </div>
        </Link>
        {/* <!--vertical line is not active--> */}
        <VerticalLine active={false} />
        <Link href='/dashboard/steptwo'>
          <div className='flex items-center gap-4'>
            {/* <!--the second dot is not active--> */}
            <Dot active={false} />
            <p>Step 2</p>
          </div>
        </Link>

{/* <!--the second vertical line is not active too--> */}
        <VerticalLine active={false} />
        <Link href='/dashboard/stepthree'>
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