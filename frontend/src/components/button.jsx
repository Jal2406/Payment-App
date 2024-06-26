export default function Button({text, onClick}) {
    return(
        <div>
            <button type="button" onClick={onClick} className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg mt-4 text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                {text}
            </button>
        </div>
    )
}