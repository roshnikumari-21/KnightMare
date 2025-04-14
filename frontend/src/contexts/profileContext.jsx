import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { commoncontext } from "./commoncontext";

export const profileContext = createContext();

const transformData = (activity) => {
  if (!activity || !Array.isArray(activity)) return [];
  const activityMap = {};
  activity.forEach(({date}) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    activityMap[formattedDate] = (activityMap[formattedDate] || 0) + 1;
  });
  return Object.keys(activityMap).map((date) => ({
    date,
    count: activityMap[date],
  }));
};

const ProfileProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const {setUser, user, diffuseremail} = useContext(commoncontext);
  const [res, setres] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [userRank, setUserRank] = useState(null);
  const [gameDuration, setGameDuration] = useState({ totalDuration: 0, hoursPlayed: 0 });
  const useremail = diffuseremail ? diffuseremail : user.email;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/auth/user`, {
          headers: {
            email: useremail,
          },
        });
        
        if (response.data.success) {
          setres(response.data.user);
          setUserRank(response.data.rank);
          const durationResponse = await axios.get(
            `${backendUrl}/api/games/user/${response.data.user._id}/game-duration`
          );
          if (durationResponse.data.success) {
            setGameDuration({
              totalDuration: durationResponse.data.totalDuration,
              hoursPlayed: durationResponse.data.hoursPlayed
            });
          }
        } else {
          console.error("Failed to fetch user profile:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [backendUrl, setUser, useremail]);

  useEffect(() => {
    if (res) {
      const DailyActivityMap = transformData(res.dailyActivity);
      DailyActivityMap.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });

      let MaxScore = -1000000000000;
      let MinScore = 10000000000000;
      
      res.ratingHistory.forEach(({ score }) => {
        MaxScore = Math.max(MaxScore, score);
        MinScore = Math.min(MinScore, score);
      });

      if(res.ratingHistory.length == 0) MinScore = "NA";
      if(res.ratingHistory.length == 0) MaxScore = "NA";

      const FirstGameDate = DailyActivityMap.length > 0 ? DailyActivityMap[0].date : null;
      const LastGameDate = DailyActivityMap.length > 0 ? DailyActivityMap[DailyActivityMap.length - 1].date : null;

      const newProfile = {
        username: res.username,
        email: res.email,
        profilePicture: res.profilePicture,
        isVerified: res.isVerified,
        score: res.score,
        gamesPlayed: res.gamesPlayed,
        gamesWon: res.gamesWon,
        gamesLost: res.gamesLost,
        gamesDrawn: res.gamesDrawn,
        gamesResigned: res.gamesResigned,
        gameHistory: res.gameHistory,
        LastGameID: "This will be done later",
        DailyActivityMap: DailyActivityMap,
        longestStreak: res.longestStreak,
        currentStreak: res.currentStreak,
        ratingHistory: res.ratingHistory,
        MaxScore: MaxScore,
        MinScore: MinScore,
        HoursPlayed: gameDuration.hoursPlayed,
        TotalDuration: gameDuration.totalDuration,
        FirstGamePlayDate: FirstGameDate,
        LastGamePlayDate: LastGameDate,
      };
      setUserProfile(newProfile);
    }
  }, [res, gameDuration]);
  const value = {
    backendUrl,
    userProfile,
    setUserProfile,
    userRank,
    loading,
  };

  return (
    <profileContext.Provider value={value}>
      {props.children}
    </profileContext.Provider>
  );
};

export default ProfileProvider;