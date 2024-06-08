export default function MainMusicCard({}) {
  return (
    <div
      key={index}
      onMouseEnter={() => setHoveredSong(index)}
      onMouseLeave={() => setHoveredSong(null)}
      className="grid grid-cols-5 py-2 px-4 hover:bg-hoverColor rounded-md duration-200 cursor-pointer mt-2 items-center text-sm text-secondaryColor"
    >
      <div className="flex col-span-3 items-center gap-5">
        <div className="w-[10px]">
          {hoveredSong !== index ? (
            <p>{index + 1}</p>
          ) : (
            <FaPlay className="text-xs text-white" />
          )}
        </div>
        <img src={bill} className="w-10 h-10 "></img>
        <p className="font-semibold text-white">image</p>
      </div>
      <div>
        <p
          className={`${
            hoveredSong === index && "text-white"
          } font-semibold text-[12px] tracking-wider`}
        >
          2,212,291,101
        </p>
      </div>
      <div className="flex gap-6 items-center">
        <FaHeart className="text-green-500" />
        <p>3:37</p>
        {hoveredSong === index && (
          <PiDotsThreeBold className="text-2xl hover:scale-105 duration-300 cursor-pointer hover:text-white text-secondaryColor  " />
        )}
      </div>
    </div>
  );
}
