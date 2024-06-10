import { useState } from "react";
import PlaylistContent from "../../components/playlist/PlaylistContent"

export default function PlaylistMainPage() {
  const [searchTag, setSearchTag] = useState("");

  const handleSearchTagInput = (event) => {
    setSearchTag(event.target.value);
  }

  return (
    <div className="flex flex-col items-center gap-5 px-2 pt-20 py-10">
      <input type="text" name="searchTag" placeholder="What's on your mind?" className="outline-none w-[90%] h-12 bg-gray text-frostWhite font-bold rounded-full my-2 p-7 capitalize" onChange={handleSearchTagInput} />
      <PlaylistContent search={searchTag} />
    </div>
  )
}