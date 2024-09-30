import { useDataContext } from '@/context/DataContext';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

import { Fragment, useEffect, useState } from 'react';


export default function DropdownSelectUserWithSearch() {
    const { users: people, isLoadingUsers, setSelectUser } = useDataContext();

    const [selected, setSelected] = useState(people[0])
    const [query, setQuery] = useState(people[0]?.username || "")
    useEffect(() => {
        setSelected(people[0] || {});
        setQuery(people[0]?.username || "");
    }, [people]);
    if (isLoadingUsers) {
        return <div className="relative z-50 mt-1 w-72">
            <div> <div></div></div></div>
    }


    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) =>
                person.username
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    return (
        <div className="relative w-full max-w-[300px] z-50 mt-1 mb-8">

            <Combobox value={selected} onChange={setSelected}>


                <div className="relative mt-1 w-full">
                    <div className="relative pl-4 py-3 flex w-full  cursor-pointer overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm">
                        <div className="flex">


                            <Combobox.Input
                                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 outline-none"
                                displayValue={(person: any) => person?.username || ""}
                                onChange={(event) => {
                                    setSelectUser(selected?.id_user)
                                    setQuery(event.target.value)

                                }}
                            />
                        </div>
                        <Combobox.Button className=" inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => {
                            setSelectUser(selected?.id_user)
                            setQuery('')
                        }}
                    >
                        <Combobox.Options className=" absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {filteredPeople.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredPeople.map((person: any, index: any) => (
                                    <Combobox.Option
                                        key={index}

                                        className={({ active }) =>
                                            `cursor-pointer relative  select-none py-2 pl-10 pr-4 ${active ? 'bg-black text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={person}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div onClick={() => setSelectUser(person?.id_user)} className='flex items-center gap-2'>
                                                    <div >
                                                        {person.username}
                                                    </div>


                                                </div>
                                                {selected && (
                                                    <span className={`absolute inset-y-0 left-0 flex items-center pl-3  ${active ? 'text-white' : ''}`}>
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}
