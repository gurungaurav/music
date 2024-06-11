import { UserStateTypes } from "@/interfaces/types/index.interfaces";
import { getSideBarArtists } from "@/services/client/client.service";
import { useEffect, useState } from "react";

export default function useSideBarDetailsHook(queryName: string | null) {
  const [artistLists, setArtistLists] = useState<UserStateTypes[]>([]);

  const getSidebarDetails = async () => {
    try {
      const res = await getSideBarArtists(queryName);
      console.log(res);
      let data = res.data.data;
      setArtistLists(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSidebarDetails();
  }, [queryName]);
  return { artistLists };
}
