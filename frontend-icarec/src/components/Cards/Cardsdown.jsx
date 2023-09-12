import { FaAngleDown } from "react-icons/fa";
import Card from './CardEmotic';
import { Link as LinkScroll } from 'react-scroll';
import ModalHome from '../Modals/ModalHome';

export default function Cardsdown({hidden, setHidden}) {
    const createNumberArray = (num) =>{
        const numberArray=[]
        for (let i = 1; i <= num; i++) {
            numberArray.push(i)
        }
        return numberArray
    }
    const resultTestCards = createNumberArray(30)

    const visualModal = () => {
        if (hidden === 'hidden') {
            setHidden('')
        }else{
            setHidden('hidden')
        }
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <LinkScroll activeClass="active" to="down" spy={true} smooth={true} offset={-30} duration={500}>
                <FaAngleDown className='text-3xl text-[#F3BA1A]'/>
            </LinkScroll>
            <div className='grid gap-5 2xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2' id='down'>
                <ModalHome activated={hidden} closeVisualModal={visualModal}/>
                {
                    resultTestCards.map((e,i) =>(
                        <div 
                            key={i} 
                            className='relative w-[11.25rem] md:w-60 h-[7.5rem] md:h-40 bg-[#FAE3A3] rounded-lg hover:rotate-6 duration-700 hover:shadow-2xl hover:shadow-[#100E80]'
                            onClick={visualModal}
                        >
                            <div className='absolute md:left-[187px] left-2 md:top-[5px] top-2'>
                                <Card initialNumber={0} increment={100}/>
                            </div>
                        </div>
                    ))  
                }
            </div>
        </div>
    )
}
