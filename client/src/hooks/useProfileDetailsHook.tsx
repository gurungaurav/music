import { IUserWithMusicTypes } from "@/interfaces/types/index.interfaces";
import { getProfileDetails } from "@/services/client/client.service";
import { useEffect, useState } from "react";

export default function useProfileDetailsHook(id: string) {
  const [artistDetails, setArtistDetails] = useState<IUserWithMusicTypes>();
  const [errorRes, setErrorRes] = useState<boolean>(false);

  const getHomeMusicDetails = async () => {
    try {
      const res = await getProfileDetails(id);
      console.log(res);
      let data = res.data.data;
      setArtistDetails(data);
    } catch (e: any) {
      console.log(e);
      if (e.response.status == 404) {
        setErrorRes(true);
        console.log("aa");
      }
    }
  };

  useEffect(() => {
    getHomeMusicDetails();
  }, [id]);
  return { artistDetails, errorRes };
}
