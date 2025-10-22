
const SearchPage = () => {
    return (
        <div className="min-h-screen w-full bg-zinc-950 p-8">
            <div>
                <input type="text" className="p-2 border outline-0 rounded-md bg-zinc-900 border-zinc-800 text-sm w-96" placeholder="Search your files" />
            </div>

            <div className="mt-4 p-3">
                <p className="text-sm text-zinc-500 font-medium">No Files.</p>
            </div>


        </div>
    )
}

export default SearchPage