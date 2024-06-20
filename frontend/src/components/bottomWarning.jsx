import { Link } from "react-router-dom"

export function BottomWarning({text, lable, to}) {
    return (
        <div className="flex justify-center text-sm">
            <div>
                {text}
            </div>
            <Link className="pointer underline cursor-pointer" to={to}>{lable}</Link>
        </div>
    )
}