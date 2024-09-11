
import { useDataContext } from "@/context/DataContext";



const ListRoutesMarkings = () => {
  const { tripsData, errorTrips, loadingTrips, selectTrip } = useDataContext();
  return (
    <div className="flex-1">
      <div>

        <div style={{ fontSize: 17 }}>Marcas de tiempo</div>

      </div>
      <div>
        <div className="flex flex-col gap-3 max-w-[350px]">


          {tripsData?.trips[selectTrip]?.markingtime?.map((marca: any, index: any) => {
            return <div key={index} className="py-2 px-3 cursor-pointer" >
              <div >
                Quick start
              </div>
              <div >
                Start building your next project in minutes
              </div>
            </div>
          })}
        </div>
      </div>

    </div>
  )
}

export default ListRoutesMarkings