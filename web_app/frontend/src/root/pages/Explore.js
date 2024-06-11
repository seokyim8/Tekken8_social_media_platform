import React from 'react';

const Explore = () => {
    return (
        <div className='flex flex-1 mt-4 py-20 justify-center flex-col'>
            <div className='h-4 text-blue-400 mt-6 mx-8'>
                <a className="font-semibold text-2xl hover:underline" href="https://tekken.com/" >Check out the official website for Tekken 8!</a>
            </div>
            <ul className='flex-1 overflow-y-scroll m-6'>
                <li className='w-full h-2/4 my-24'>
                    <div className="h-full flex flex-col md:flex-row items-center justify-center gap-8 mx-2">
                        <iframe className='w-full md:w-2/3 max-w-3xl h-2/3 md:h-full'
                            title="Tekken 8 Intro Video"
                            src="https://www.youtube.com/embed/fzqvmFrV46c" allow="picture-in-picture; web-share" allowFullScreen>
                        </iframe>
                        <div className="md:flex-1 md:flex md:flex-col justify-around md:h-full p-3  md:p-6 bg-gray-100 rounded-xl">
                            <span className='font-semibold text-2xl'>Tekken 8 Intro Video</span>
                            <div className='h-full flex-col justify-center hidden md:flex'>
                                <span>Considering getting Tekken 8? Do yourself a favor by checking out the intro video for Tekken 8!</span>
                                <a href='https://www.youtube.com/watch?v=fzqvmFrV46c' className='text-blue-800 hover:underline hover:text-blue-400'>https://www.youtube.com/watch?v=fzqvmFrV46c</a>
                            </div>
                            <div className="flex items-center mt-2 round justify-center md:justify-normal">
                                <img className='w-16 h-16 rounded-full me-2' src='/static/images/fox_profile.png' />
                                <div>
                                    <div className='text-lg'>Curious Fox</div>
                                    <div className='text-sm text-gray-400'>TSKM Admin</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

                <li className='w-full h-2/4 my-24'>
                    <div className="h-full flex flex-col md:flex-row items-center justify-center gap-8 mx-2">
                        <iframe className='w-full md:w-2/3 max-w-3xl h-2/3 md:h-full'
                            title="Tekken 8 Lidia"
                            src="https://www.youtube.com/embed/wapN3UqjJmI" allow="picture-in-picture; web-share" allowFullScreen>
                        </iframe>
                        <div className="md:flex-1 md:flex md:flex-col justify-around md:h-full p-3  md:p-6 bg-gray-100 rounded-xl">
                            <span className='font-semibold text-2xl'>Tekken 8 Lidia intro</span>
                            <div className='h-full flex-col justify-center hidden md:flex'>
                                <span>Lidia arrives in Tekken 8 after a long wait! Get ready to experience her might in-game!</span>
                                <a href='https://www.youtube.com/watch?v=wapN3UqjJmI' className='text-blue-800 hover:underline hover:text-blue-400'>https://www.youtube.com/watch?v=wapN3UqjJmI</a>
                            </div>
                            <div className="flex items-center mt-2 round justify-center md:justify-normal">
                                <img className='w-16 h-16 rounded-full me-2' src='/static/images/fox_profile.png' />
                                <div>
                                    <div className='text-lg'>Curious Fox</div>
                                    <div className='text-sm text-gray-400'>TSKM Admin</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>


                <li className='w-full h-2/4 my-24'>
                    <div className="h-full flex flex-col md:flex-row items-center justify-center gap-8 mx-2">
                        <iframe className='w-full md:w-2/3 max-w-3xl h-2/3 md:h-full'
                            title="Tekken 8 Eddy"
                            src="https://www.youtube.com/embed/ANgpGgRTdgU" allow="picture-in-picture; web-share" allowFullScreen>
                        </iframe>
                        <div className="md:flex-1 md:flex md:flex-col justify-around md:h-full p-3  md:p-6 bg-gray-100 rounded-xl">
                            <span className='font-semibold text-2xl'>Tekken 8 Eddy</span>
                            <div className='h-full flex-col justify-center hidden md:flex'>
                                <span>The first DLC character "Eddy" is coming out!</span>
                                <a href='https://www.youtube.com/watch?v=ANgpGgRTdgU' className='text-blue-800 hover:underline hover:text-blue-400'>https://www.youtube.com/watch?v=ANgpGgRTdgU</a>
                            </div>
                            <div className="flex items-center mt-2 round justify-center md:justify-normal">
                                <img className='w-16 h-16 rounded-full me-2' src='/static/images/fox_profile.png' />
                                <div>
                                    <div className='text-lg'>Curious Fox</div>
                                    <div className='text-sm text-gray-400'>TSKM Admin</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

        </div>
    );
}

export default Explore;