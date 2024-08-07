export default function UserPageSkeleton() {
  return (
    <div className="pt-12 relative">
      <div className="relative">
        <div className="bg-[#ababab] h-28 animate-pulse">

        </div>

        <div className="relative">
          <div className="absolute -top-20 left-5 w-36 h-36 border-4 rounded-full border-dark-near-blue bg-coal overflow-hidden animate-black-gray-pulse"></div>

          <div className="h-20"></div>

          <div className="mx-5 p-5 bg-midDark rounded-xl flex flex-col gap-4">
            <div className="h-24 pb-4 bg-dark-near-blue rounded-md animate-pulse"></div>
            <div className="py-5 h-16 pb-4 bg-dark-near-blue rounded-md animate-pulse"></div>
            <div className="pt-3 w-full h-24 bg-dark-near-blue rounded-md animate-pulse">
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
