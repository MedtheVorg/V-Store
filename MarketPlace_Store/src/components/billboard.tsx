import { Billboard as BillboardType } from '@/types';

type BillboardProps = {
    data: BillboardType;
};

export default function Billboard({ data }: BillboardProps) {
    const billboardData: BillboardType = {
        _id: data?._id || '',
        label: data?.label || '',
        imageUrl: data?.imageUrl || 'https://loremflickr.com/1920/384',
    };
    return (
        <div className='pb-4 sm:pb-6 lg:pb-8  overflow-hidden max-h-96'>
            <div
                className=' relative aspect-video max-h-96 w-full overflow-hidden  bg-cover bg-center'
                style={{ backgroundImage: `url(${billboardData.imageUrl})` }}
            >
                <div className='h-full w-full flex flex-col justify-center items-center text-center gap-y-8 bg-neutral-700/40  '>
                    <div className='font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs   text-white  '>
                        {billboardData.label}
                    </div>
                </div>
            </div>
        </div>
    );
}
