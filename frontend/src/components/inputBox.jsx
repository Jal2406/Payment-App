export function InputBox({lable, placeholder, onChange}){
    return (
        <div>
            <div className="font-medium text-sm py-2">{lable}</div>
            <input onChange={onChange} type="text" placeholder={placeholder} className="w-full text-sm px-2 py-3 border border-gray-400 focus:outline-none rounded-md" />
        </div>
    )
}