const AvatarLable = ({lable}) => {
    return (
        <div className="flex mt-12 mb-4">
            <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center mt-1 mr-2 ml-2">
                <div className="flex flex-col justify-center h-full text-xl items-center">
                    {lable.charAt(0).toUpperCase()}
                </div>
            </div>
            <div className="flex flex-col justify-center">
                {lable}
            </div>
        </div>
    )
}

export default AvatarLable;