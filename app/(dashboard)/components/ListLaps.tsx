"use client";

import { useDataContext } from "@/context/DataContext";
import { RadioGroup } from "@headlessui/react";

import { useState } from "react";
const load = [1, 2, 3, 4, 5];

const ListLaps = () => {


  const { trips, errorTrips, setSelectTrip, selectTrip, loadingTrips } = useDataContext();
  const [selected, setSelected] = useState(trips[0])


  return (
    <div className="max-w-[500px]">
      <div>
        <div style={{ fontSize: 17 }}>Vueltas Realizadas</div>
      </div>
      <div>
        <div className="flex flex-col gap-3">
          {loadingTrips && load.map((el) => {
            return <div className="h-[50px] rounded-md w-full" key={el}></div>
          })}
        </div>
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {trips.map((trip: any, index: any) => (
              <RadioGroup.Option
                key={index}
                value={trip}
                className={({ active, checked }) =>
                  `${active
                    ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300'
                    : ''
                  }
                  ${checked ? 'bg-black text-white' : 'bg-white'}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
                onClick={() => setSelectTrip(index)}
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'
                              }`}
                          >
                            Enterprise
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${checked ? 'text-sky-100' : 'text-gray-500'
                              }`}
                          >
                            <span>
                              12 GB/ 0.1
                            </span>{' '}
                            <span aria-hidden="true">&middot;</span>{' '}
                            <span>SSD 200</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>

    </div>
  )
}
function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default ListLaps