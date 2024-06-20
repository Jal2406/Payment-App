const Navbar = () => {
    return(
        <div className="flex justify-between border border-solid border-b-gray-300 py-2 px-2 item-center">
            <div className="flex justify-center items-center">
                <div className="text-xl font-semibold">
                    Payment App
                </div>
            </div>
            <div className="flex flex-row-reverse items-center">
            <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center mt-1 mr-2 ml-2">
                <div className="flex flex-col justify-center h-full text-xl items-center">
                    U
                </div>
            </div>
                <div className="flex justify-center">
                    Hello
                </div>
            </div>
        </div>
    )
}

export default Navbar;