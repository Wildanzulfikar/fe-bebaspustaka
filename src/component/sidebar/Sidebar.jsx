import { getData } from "./dataNavigation"
import Navigation from "./Navigation"

function Sidebar() {

    const datas = getData()

    return (
        <div className="bg-white h-full">
            <div className="flex flex-col gap-2">
                {datas.map((data) => (
                    <Navigation key={data.id}  {...data}/>
                ))}
            </div>
        </div>
    )
}

export default Sidebar