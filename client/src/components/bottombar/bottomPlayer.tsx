import bill from "../../assets/bill.jfif";
import MusicPlayer from "@/components/music/musicPlayer";

export default function BottomPlayer() {
  let hehe =
    "  http://localhost:4000/uploads/music/b765a8add257c732318b8c53cd7381a0";
  const audioList = [
    {
      name: "Song Name",
      singer: "Singer Name",
      cover: bill,
      musicSrc: hehe,
    },
    {
      name: "Song ",
      singer: "Singer ",
      cover: bill,
      musicSrc: hehe,
    },
  ];

  return (
    // <div className="  bg-black   flex justify-between">
    //   <div>
    //     <p>Song playing</p>
    //   </div>
    //   <div>
    //     <p>Music</p>
    //   </div>
    //   <div>
    //     <p>Song adjust</p>
    //   </div>
    // </div>
    <div className="w-full">
      <MusicPlayer />
    </div>
  );
}
